import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Unsubscribe,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { User } from 'firebase/auth';
import { getFirebaseDb, getFirebaseStorage } from '../firebase';

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';
export type ProgressLevel = 'Beginning' | 'Developing' | 'On track' | 'Excellent';

export interface HindiStudent {
  id: string;
  name: string;
  grade: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  active: boolean;
  createdAt?: unknown;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classDate: string;
  status: AttendanceStatus;
  note: string;
  updatedAt?: unknown;
}

export interface ProgressEntry {
  id: string;
  studentId: string;
  level: ProgressLevel;
  comment: string;
  createdAt?: unknown;
}

export interface HomeworkAssignment {
  id: string;
  title: string;
  instructions: string;
  dueDate: string;
  createdAt?: unknown;
}

export interface HomeworkSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  parentEmail: string;
  fileName: string;
  fileUrl: string;
  submittedAt?: unknown;
}

type StudentRecord = AttendanceRecord | ProgressEntry | HomeworkSubmission;

function mapDocuments<T extends { id: string }>(snapshot: any): T[] {
  return snapshot.docs.map((item: any) => ({ id: item.id, ...item.data() } as T));
}

export function subscribeToStudents(
  parentEmail: string | null,
  onData: (students: HindiStudent[]) => void,
  onError: (error: Error) => void
): Unsubscribe {
  const students = collection(getFirebaseDb(), 'hindiStudents');
  const source = parentEmail
    ? query(students, where('parentEmail', '==', parentEmail.toLowerCase()))
    : students;

  return onSnapshot(
    source,
    (snapshot) => {
      const rows = mapDocuments<HindiStudent>(snapshot);
      rows.sort((a, b) => a.name.localeCompare(b.name));
      onData(rows);
    },
    onError
  );
}

export function subscribeToHomework(
  onData: (assignments: HomeworkAssignment[]) => void,
  onError: (error: Error) => void
): Unsubscribe {
  return onSnapshot(
    collection(getFirebaseDb(), 'hindiHomework'),
    (snapshot) => {
      const rows = mapDocuments<HomeworkAssignment>(snapshot);
      rows.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
      onData(rows);
    },
    onError
  );
}

export function subscribeToStudentRecords<T extends StudentRecord>(
  collectionName: 'hindiAttendance' | 'hindiProgress' | 'hindiSubmissions',
  studentIds: string[],
  onData: (records: T[]) => void,
  onError: (error: Error) => void
): Unsubscribe {
  if (studentIds.length === 0) {
    onData([]);
    return () => undefined;
  }

  const recordsByStudent = new Map<string, T[]>();
  const unsubscribes = studentIds.map((studentId) =>
    onSnapshot(
      query(collection(getFirebaseDb(), collectionName), where('studentId', '==', studentId)),
      (snapshot) => {
        recordsByStudent.set(studentId, mapDocuments<T>(snapshot));
        onData(Array.from(recordsByStudent.values()).flat());
      },
      onError
    )
  );

  return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
}

export async function addStudent(
  name: string,
  grade: string,
  parentName: string,
  parentEmail: string,
  parentPhone: string
): Promise<void> {
  await addDoc(collection(getFirebaseDb(), 'hindiStudents'), {
    name: name.trim(),
    grade: grade.trim(),
    parentName: parentName.trim(),
    parentEmail: parentEmail.trim().toLowerCase(),
    parentPhone: parentPhone.trim(),
    active: true,
    createdAt: serverTimestamp(),
  });
}

export type HindiStudentImport = Pick<
  HindiStudent,
  'name' | 'grade' | 'parentName' | 'parentEmail' | 'parentPhone'
>;

export async function importStudents(students: HindiStudentImport[]): Promise<void> {
  await Promise.all(
    students.map((student) => {
      const importId = `${student.name}_${student.parentEmail}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      return setDoc(doc(getFirebaseDb(), 'hindiStudents', `import-${importId}`), {
        ...student,
        parentEmail: student.parentEmail.trim().toLowerCase(),
        active: true,
        createdAt: serverTimestamp(),
      });
    })
  );
}

export async function removeStudent(studentId: string): Promise<void> {
  await deleteDoc(doc(getFirebaseDb(), 'hindiStudents', studentId));
}

export async function saveAttendance(
  studentId: string,
  classDate: string,
  status: AttendanceStatus,
  note: string
): Promise<void> {
  await setDoc(doc(getFirebaseDb(), 'hindiAttendance', `${studentId}_${classDate}`), {
    studentId,
    classDate,
    status,
    note: note.trim(),
    updatedAt: serverTimestamp(),
  });
}

export async function addProgress(
  studentId: string,
  level: ProgressLevel,
  comment: string
): Promise<void> {
  await addDoc(collection(getFirebaseDb(), 'hindiProgress'), {
    studentId,
    level,
    comment: comment.trim(),
    createdAt: serverTimestamp(),
  });
}

export async function addHomework(
  title: string,
  instructions: string,
  dueDate: string
): Promise<void> {
  await addDoc(collection(getFirebaseDb(), 'hindiHomework'), {
    title: title.trim(),
    instructions: instructions.trim(),
    dueDate,
    createdAt: serverTimestamp(),
  });
}

export async function uploadHomework(
  user: User,
  student: HindiStudent,
  assignment: HomeworkAssignment,
  file: File
): Promise<void> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const submissionId = `${assignment.id}_${student.id}`;
  const storagePath = `hindi-homework/${student.id}/${assignment.id}/${user.uid}-${safeName}`;
  const storageRef = ref(getFirebaseStorage(), storagePath);

  await uploadBytes(storageRef, file, {
    contentType: file.type || 'application/octet-stream',
    customMetadata: {
      studentId: student.id,
      assignmentId: assignment.id,
      parentEmail: student.parentEmail,
    },
  });
  const fileUrl = await getDownloadURL(storageRef);

  await setDoc(doc(getFirebaseDb(), 'hindiSubmissions', submissionId), {
    assignmentId: assignment.id,
    studentId: student.id,
    parentEmail: student.parentEmail,
    fileName: file.name,
    fileUrl,
    storagePath,
    submittedAt: serverTimestamp(),
  });
}

export function formatFirebaseDate(value: any): string {
  if (!value) return '';
  const date = typeof value.toDate === 'function' ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}
