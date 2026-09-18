const express = require('express');
const multer = require('multer');
const { randomUUID } = require('crypto');
const { cert, getApps, initializeApp, applicationDefault } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { FieldValue, getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');

const ADMIN_EMAILS = new Set(
  (process.env.HINDI_ADMIN_EMAILS || 'patpi.shivacharan@gmail.com')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
);
const ALLOWED_FILE_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
]);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (_request, file, callback) => {
    if (ALLOWED_FILE_TYPES.has(file.mimetype)) callback(null, true);
    else callback(new Error('Only PDF, Word, JPG, and PNG files are allowed.'));
  },
});

function getAdminApp() {
  if (getApps().length) return getApps()[0];

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const credential = serviceAccountJson
    ? cert(JSON.parse(serviceAccountJson))
    : applicationDefault();

  return initializeApp({
    credential,
    projectId: process.env.FIREBASE_PROJECT_ID || 'shivapatpi',
    storageBucket:
      process.env.FIREBASE_STORAGE_BUCKET || 'shivapatpi.firebasestorage.app',
  });
}

function database() {
  return getFirestore(getAdminApp());
}

function isAdmin(user) {
  return user.admin === true || ADMIN_EMAILS.has((user.email || '').toLowerCase());
}

async function authenticate(request, response, next) {
  const authorization = request.get('authorization') || '';
  if (!authorization.startsWith('Bearer ')) {
    return response.status(401).json({ error: 'Authentication is required.' });
  }

  try {
    request.firebaseUser = await getAuth(getAdminApp()).verifyIdToken(
      authorization.slice('Bearer '.length)
    );
    return next();
  } catch (error) {
    console.error('Hindi Classes authentication failed:', error.message);
    return response.status(401).json({ error: 'Your session is invalid or expired.' });
  }
}

function requireAdmin(request, response, next) {
  if (!isAdmin(request.firebaseUser)) {
    return response.status(403).json({ error: 'Administrator access is required.' });
  }
  return next();
}

function serializeDocument(snapshot) {
  const data = snapshot.data();
  const serialized = { id: snapshot.id, ...data };
  for (const field of ['createdAt', 'updatedAt', 'submittedAt']) {
    if (serialized[field]?.toDate) {
      serialized[field] = serialized[field].toDate().toISOString();
    }
  }
  return serialized;
}

async function getAuthorizedStudents(user, allowAdminAccess) {
  const students = database().collection('hindiStudents');
  const snapshot = allowAdminAccess
    ? await students.get()
    : await students.where('parentEmail', '==', (user.email || '').toLowerCase()).get();
  return snapshot.docs.map(serializeDocument).sort((a, b) => a.name.localeCompare(b.name));
}

async function getRecords(collectionName, students, admin) {
  if (!students.length) return [];
  const collection = database().collection(collectionName);
  if (admin) {
    const snapshot = await collection.get();
    return snapshot.docs.map(serializeDocument);
  }

  const snapshots = await Promise.all(
    students.map((student) => collection.where('studentId', '==', student.id).get())
  );
  return snapshots.flatMap((snapshot) => snapshot.docs.map(serializeDocument));
}

function requiredString(value, fieldName) {
  const text = String(value || '').trim();
  if (!text) {
    const error = new Error(`${fieldName} is required.`);
    error.status = 400;
    throw error;
  }
  return text;
}

function asyncRoute(handler) {
  return (request, response, next) =>
    Promise.resolve(handler(request, response, next)).catch(next);
}

function createHindiClassesRouter() {
  const router = express.Router();
  router.use(authenticate);

  router.get(
    '/data',
    asyncRoute(async (request, response) => {
      const admin = isAdmin(request.firebaseUser) && request.query.role === 'admin';
      const students = await getAuthorizedStudents(request.firebaseUser, admin);
      const [attendance, progress, homeworkSnapshot, submissions] = await Promise.all([
        getRecords('hindiAttendance', students, admin),
        getRecords('hindiProgress', students, admin),
        database().collection('hindiHomework').get(),
        getRecords('hindiSubmissions', students, admin),
      ]);
      const homework = homeworkSnapshot.docs
        .map(serializeDocument)
        .sort((a, b) => b.dueDate.localeCompare(a.dueDate));

      response.json({ students, attendance, progress, homework, submissions, isAdmin: admin });
    })
  );

  router.post(
    '/students',
    requireAdmin,
    asyncRoute(async (request, response) => {
      const student = {
        name: requiredString(request.body.name, 'Student name'),
        grade: requiredString(request.body.grade, 'Grade'),
        parentName: requiredString(request.body.parentName, 'Parent name'),
        parentEmail: requiredString(request.body.parentEmail, 'Parent email').toLowerCase(),
        parentPhone: requiredString(request.body.parentPhone, 'Parent phone'),
        active: true,
        createdAt: FieldValue.serverTimestamp(),
      };
      const document = await database().collection('hindiStudents').add(student);
      response.status(201).json({ id: document.id });
    })
  );

  router.post(
    '/students/import',
    requireAdmin,
    asyncRoute(async (request, response) => {
      if (!Array.isArray(request.body.students) || request.body.students.length > 500) {
        return response.status(400).json({ error: 'Provide a roster of no more than 500 students.' });
      }
      const batch = database().batch();
      request.body.students.forEach((student) => {
        const name = requiredString(student.name, 'Student name');
        const parentEmail = requiredString(student.parentEmail, 'Parent email').toLowerCase();
        const importId = `${name}_${parentEmail}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        batch.set(database().collection('hindiStudents').doc(`import-${importId}`), {
          name,
          grade: requiredString(student.grade, 'Grade'),
          parentName: requiredString(student.parentName, 'Parent name'),
          parentEmail,
          parentPhone: requiredString(student.parentPhone, 'Parent phone'),
          active: true,
          createdAt: FieldValue.serverTimestamp(),
        });
      });
      await batch.commit();
      response.status(201).json({ imported: request.body.students.length });
    })
  );

  router.delete(
    '/students/:studentId',
    requireAdmin,
    asyncRoute(async (request, response) => {
      await database().collection('hindiStudents').doc(request.params.studentId).delete();
      response.status(204).end();
    })
  );

  router.put(
    '/attendance/:studentId/:classDate',
    requireAdmin,
    asyncRoute(async (request, response) => {
      const validStatuses = new Set(['present', 'absent', 'late', 'excused']);
      if (!validStatuses.has(request.body.status)) {
        return response.status(400).json({ error: 'Invalid attendance status.' });
      }
      await database()
        .collection('hindiAttendance')
        .doc(`${request.params.studentId}_${request.params.classDate}`)
        .set({
          studentId: request.params.studentId,
          classDate: request.params.classDate,
          status: request.body.status,
          note: String(request.body.note || '').trim(),
          updatedAt: FieldValue.serverTimestamp(),
        });
      response.status(204).end();
    })
  );

  router.post(
    '/progress',
    requireAdmin,
    asyncRoute(async (request, response) => {
      const validLevels = new Set(['Beginning', 'Developing', 'On track', 'Excellent']);
      if (!validLevels.has(request.body.level)) {
        return response.status(400).json({ error: 'Invalid progress level.' });
      }
      const document = await database().collection('hindiProgress').add({
        studentId: requiredString(request.body.studentId, 'Student'),
        level: request.body.level,
        comment: requiredString(request.body.comment, 'Comment'),
        createdAt: FieldValue.serverTimestamp(),
      });
      response.status(201).json({ id: document.id });
    })
  );

  router.post(
    '/homework',
    requireAdmin,
    asyncRoute(async (request, response) => {
      const document = await database().collection('hindiHomework').add({
        title: requiredString(request.body.title, 'Title'),
        instructions: requiredString(request.body.instructions, 'Instructions'),
        dueDate: requiredString(request.body.dueDate, 'Due date'),
        createdAt: FieldValue.serverTimestamp(),
      });
      response.status(201).json({ id: document.id });
    })
  );

  router.post(
    '/submissions',
    upload.single('file'),
    asyncRoute(async (request, response) => {
      if (!request.file) return response.status(400).json({ error: 'Homework file is required.' });
      const studentId = requiredString(request.body.studentId, 'Student');
      const assignmentId = requiredString(request.body.assignmentId, 'Assignment');
      const studentSnapshot = await database().collection('hindiStudents').doc(studentId).get();
      if (!studentSnapshot.exists) return response.status(404).json({ error: 'Student not found.' });

      const student = studentSnapshot.data();
      if (
        !isAdmin(request.firebaseUser) &&
        student.parentEmail !== (request.firebaseUser.email || '').toLowerCase()
      ) {
        return response.status(403).json({ error: 'You cannot submit work for this student.' });
      }

      const safeName = request.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
      const path = `hindi-homework/${studentId}/${assignmentId}/${request.firebaseUser.uid}-${safeName}`;
      const token = randomUUID();
      const bucket = getStorage(getAdminApp()).bucket();
      await bucket.file(path).save(request.file.buffer, {
        resumable: false,
        contentType: request.file.mimetype,
        metadata: {
          metadata: {
            firebaseStorageDownloadTokens: token,
            studentId,
            assignmentId,
            parentEmail: student.parentEmail,
          },
        },
      });
      const fileUrl =
        `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/` +
        `${encodeURIComponent(path)}?alt=media&token=${token}`;
      const submissionId = `${assignmentId}_${studentId}`;
      await database().collection('hindiSubmissions').doc(submissionId).set({
        assignmentId,
        studentId,
        parentEmail: student.parentEmail,
        fileName: request.file.originalname,
        fileUrl,
        storagePath: path,
        submittedAt: FieldValue.serverTimestamp(),
      });
      response.status(201).json({ id: submissionId, fileUrl });
    })
  );

  router.use((error, _request, response, _next) => {
    console.error('Hindi Classes API error:', error);
    if (error instanceof multer.MulterError) {
      return response.status(400).json({
        error: error.code === 'LIMIT_FILE_SIZE' ? 'File must be smaller than 10 MB.' : error.message,
      });
    }
    return response.status(error.status || 500).json({
      error: error.status ? error.message : 'The Hindi Classes service is unavailable.',
    });
  });

  return router;
}

module.exports = { createHindiClassesRouter };
