import React, { FormEvent, useEffect, useState } from 'react';
import { getIdTokenResult } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import {
  addHomework,
  addProgress,
  addStudent,
  AttendanceRecord,
  AttendanceStatus,
  formatFirebaseDate,
  HindiStudent,
  HomeworkAssignment,
  HomeworkSubmission,
  importStudents,
  ProgressEntry,
  ProgressLevel,
  removeStudent,
  saveAttendance,
  subscribeToHindiClassData,
  uploadHomework,
} from '../services/hindiClasses';
import '../styles/HindiClasses.css';

type LoginRole = 'admin' | 'parent';
type AdminTab = 'attendance' | 'progress' | 'homework' | 'students';

const CLASS_START = '2026-09-19';
const FILE_TYPES = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ADMIN_EMAILS = ['patpi.shivacharan@gmail.com'];

const HindiClasses: React.FC = () => {
  const { user, loading, firebaseAvailable, signInWithGoogle, signInWithMicrosoft, logout } = useAuth();
  const [loginRole, setLoginRole] = useState<LoginRole>('parent');
  const [role, setRole] = useState<LoginRole | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(false);
  const [students, setStudents] = useState<HindiStudent[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [homework, setHomework] = useState<HomeworkAssignment[]>([]);
  const [submissions, setSubmissions] = useState<HomeworkSubmission[]>([]);
  const [activeTab, setActiveTab] = useState<AdminTab>('attendance');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setIsAdmin(false);
      return;
    }

    let current = true;
    setCheckingRole(true);
    getIdTokenResult(user)
      .then((token) => {
        if (!current) return;
        const hasAdminClaim = token.claims.admin === true;
        const hasAdminEmail = ADMIN_EMAILS.includes((user.email || '').toLowerCase());
        setIsAdmin(hasAdminClaim || hasAdminEmail);
        setRole(loginRole);
      })
      .catch((authError) => setError(getErrorMessage(authError)))
      .finally(() => current && setCheckingRole(false));

    return () => {
      current = false;
    };
  }, [user, loginRole]);

  useEffect(() => {
    if (!user || !role || (role === 'admin' && !isAdmin)) return;
    setError('');
    return subscribeToHindiClassData(
      role,
      (data) => {
        setStudents(data.students);
        setAttendance(data.attendance);
        setProgress(data.progress);
        setHomework(data.homework);
        setSubmissions(data.submissions);
      },
      (loadError) => setError(getErrorMessage(loadError))
    );
  }, [user, role, isAdmin]);

  const signIn = async (provider: 'google' | 'microsoft') => {
    setError('');
    setMessage('');
    try {
      if (provider === 'google') await signInWithGoogle();
      else await signInWithMicrosoft();
    } catch (authError) {
      setError(getErrorMessage(authError));
    }
  };

  const signOut = async () => {
    await logout();
    setStudents([]);
    setAttendance([]);
    setProgress([]);
    setHomework([]);
    setSubmissions([]);
  };

  if (loading || checkingRole) {
    return <div className="hindi-status">Loading Hindi Classes...</div>;
  }

  if (!firebaseAvailable) {
    return (
      <main className="hindi-page">
        <ClassHero />
        <div className="hindi-alert error">
          Hindi Classes needs Firebase configuration. Add the Firebase values from
          <code> .env.example</code> to the deployment environment.
        </div>
      </main>
    );
  }

  if (!user || !role) {
    return (
      <main className="hindi-page">
        <ClassHero />
        <section className="login-card" aria-labelledby="login-heading">
          <h2 id="login-heading">Sign in to Hindi Classes</h2>
          <p>Choose how you are signing in. Parents only see students linked to their email.</p>
          <div className="role-options">
            <button
              className={loginRole === 'parent' ? 'role-option selected' : 'role-option'}
              onClick={() => setLoginRole('parent')}
              type="button"
            >
              <span>👪</span>
              <strong>Parent Login</strong>
              <small>View progress and submit homework</small>
            </button>
            <button
              className={loginRole === 'admin' ? 'role-option selected' : 'role-option'}
              onClick={() => setLoginRole('admin')}
              type="button"
            >
              <span>🧑‍🏫</span>
              <strong>Admin Login</strong>
              <small>Manage students, attendance and lessons</small>
            </button>
          </div>
          <div className="provider-buttons">
            <button type="button" className="provider-button google" onClick={() => signIn('google')}>
              Continue with Google
            </button>
            <button
              type="button"
              className="provider-button microsoft"
              onClick={() => signIn('microsoft')}
            >
              Continue with Microsoft
            </button>
          </div>
          {error && <div className="hindi-alert error">{error}</div>}
        </section>
      </main>
    );
  }

  if (role === 'admin' && !isAdmin) {
    return (
      <main className="hindi-page">
        <ClassHero />
        <section className="login-card">
          <h2>Admin access required</h2>
          <p>
            <strong>{user.email}</strong> is signed in, but this account does not have the Firebase
            admin claim.
          </p>
          <button className="hindi-button secondary" onClick={signOut} type="button">
            Sign out
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="hindi-page">
      <ClassHero />
      <div className="account-bar">
        <div>
          <span className={`role-badge ${role}`}>{role === 'admin' ? 'Admin' : 'Parent'}</span>
          <strong>{user.displayName || user.email}</strong>
        </div>
        <button className="text-button" type="button" onClick={signOut}>
          Sign out
        </button>
      </div>
      {error && <div className="hindi-alert error">{error}</div>}
      {message && <div className="hindi-alert success">{message}</div>}

      {role === 'admin' ? (
        <AdminDashboard
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          students={students}
          attendance={attendance}
          progress={progress}
          homework={homework}
          submissions={submissions}
          busy={busy}
          runAction={async (action, successMessage) => {
            setBusy(true);
            setError('');
            setMessage('');
            try {
              await action();
              setMessage(successMessage);
            } catch (actionError) {
              setError(getErrorMessage(actionError));
            } finally {
              setBusy(false);
            }
          }}
        />
      ) : (
        <ParentDashboard
          user={user}
          students={students}
          attendance={attendance}
          progress={progress}
          homework={homework}
          submissions={submissions}
          busy={busy}
          runAction={async (action, successMessage) => {
            setBusy(true);
            setError('');
            setMessage('');
            try {
              await action();
              setMessage(successMessage);
            } catch (actionError) {
              setError(getErrorMessage(actionError));
            } finally {
              setBusy(false);
            }
          }}
        />
      )}
    </main>
  );
};

const ClassHero = () => (
  <section className="hindi-hero">
    <div>
      <span className="eyebrow">हिंदी कक्षा • Hindi Classes</span>
      <h1>Learn Hindi, one Saturday at a time.</h1>
      <p>Attendance, teacher feedback, progress, and homework in one secure family portal.</p>
    </div>
    <div className="schedule-card">
      <span>📅</span>
      <div>
        <strong>Every Saturday</strong>
        <small>10:00–11:00 AM Pacific • Starts September 19, 2026</small>
      </div>
    </div>
  </section>
);

interface DashboardProps {
  students: HindiStudent[];
  attendance: AttendanceRecord[];
  progress: ProgressEntry[];
  homework: HomeworkAssignment[];
  submissions: HomeworkSubmission[];
  busy: boolean;
  runAction: (action: () => Promise<void>, successMessage: string) => Promise<void>;
}

const AdminDashboard: React.FC<
  DashboardProps & { activeTab: AdminTab; setActiveTab: (tab: AdminTab) => void }
> = ({ activeTab, setActiveTab, students, attendance, progress, homework, submissions, busy, runAction }) => (
  <>
    <section className="summary-grid">
      <SummaryCard icon="🎓" value={students.length} label="Students" />
      <SummaryCard
        icon="✅"
        value={attendance.filter((item) => item.status === 'present').length}
        label="Present records"
      />
      <SummaryCard icon="📝" value={homework.length} label="Assignments" />
      <SummaryCard icon="📤" value={submissions.length} label="Submissions" />
    </section>
    <nav className="dashboard-tabs" aria-label="Hindi Classes administration">
      {(['attendance', 'progress', 'homework', 'students'] as AdminTab[]).map((tab) => (
        <button
          key={tab}
          type="button"
          className={activeTab === tab ? 'active' : ''}
          onClick={() => setActiveTab(tab)}
        >
          {tab[0].toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </nav>
    {activeTab === 'attendance' && (
      <AttendanceAdmin students={students} attendance={attendance} busy={busy} runAction={runAction} />
    )}
    {activeTab === 'progress' && (
      <ProgressAdmin students={students} progress={progress} busy={busy} runAction={runAction} />
    )}
    {activeTab === 'homework' && (
      <HomeworkAdmin
        students={students}
        homework={homework}
        submissions={submissions}
        busy={busy}
        runAction={runAction}
      />
    )}
    {activeTab === 'students' && (
      <StudentsAdmin students={students} busy={busy} runAction={runAction} />
    )}
  </>
);

const SummaryCard = ({ icon, value, label }: { icon: string; value: number; label: string }) => (
  <div className="summary-card">
    <span>{icon}</span>
    <div>
      <strong>{value}</strong>
      <small>{label}</small>
    </div>
  </div>
);

const EmptyStudents = () => (
  <div className="empty-state">
    <span>🎒</span>
    <h3>No students enrolled yet</h3>
    <p>Add students from the Students tab. Their parent email controls portal access.</p>
  </div>
);

const AttendanceAdmin: React.FC<
  Pick<DashboardProps, 'students' | 'attendance' | 'busy' | 'runAction'>
> = ({ students, attendance, busy, runAction }) => {
  const [classDate, setClassDate] = useState(CLASS_START);
  const [draft, setDraft] = useState<Record<string, { status: AttendanceStatus; note: string }>>({});

  useEffect(() => {
    const next: Record<string, { status: AttendanceStatus; note: string }> = {};
    students.forEach((student) => {
      const saved = attendance.find(
        (record) => record.studentId === student.id && record.classDate === classDate
      );
      next[student.id] = { status: saved?.status || 'present', note: saved?.note || '' };
    });
    setDraft(next);
  }, [students, attendance, classDate]);

  if (!students.length) return <EmptyStudents />;
  return (
    <section className="dashboard-panel">
      <div className="panel-heading">
        <div>
          <h2>Take attendance</h2>
          <p>Save the status for each student after Saturday’s class.</p>
        </div>
        <label>
          Class date
          <input type="date" min={CLASS_START} value={classDate} onChange={(e) => setClassDate(e.target.value)} />
        </label>
      </div>
      <div className="attendance-list">
        {students.map((student) => (
          <div className="attendance-row" key={student.id}>
            <StudentIdentity student={student} />
            <select
              value={draft[student.id]?.status || 'present'}
              onChange={(e) =>
                setDraft((current) => ({
                  ...current,
                  [student.id]: {
                    ...current[student.id],
                    status: e.target.value as AttendanceStatus,
                  },
                }))
              }
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="excused">Excused</option>
            </select>
            <input
              aria-label={`Attendance note for ${student.name}`}
              placeholder="Optional note"
              value={draft[student.id]?.note || ''}
              onChange={(e) =>
                setDraft((current) => ({
                  ...current,
                  [student.id]: { ...current[student.id], note: e.target.value },
                }))
              }
            />
          </div>
        ))}
      </div>
      <button
        className="hindi-button"
        type="button"
        disabled={busy || !classDate}
        onClick={() =>
          runAction(
            () =>
              Promise.all(
                students.map((student) =>
                  saveAttendance(
                    student.id,
                    classDate,
                    draft[student.id]?.status || 'present',
                    draft[student.id]?.note || ''
                  )
                )
              ).then(() => undefined),
            'Attendance saved.'
          )
        }
      >
        Save attendance
      </button>
    </section>
  );
};

const ProgressAdmin: React.FC<
  Pick<DashboardProps, 'students' | 'progress' | 'busy' | 'runAction'>
> = ({ students, progress, busy, runAction }) => {
  const [studentId, setStudentId] = useState('');
  const [level, setLevel] = useState<ProgressLevel>('On track');
  const [comment, setComment] = useState('');
  useEffect(() => {
    if (!studentId && students[0]) setStudentId(students[0].id);
  }, [students, studentId]);

  if (!students.length) return <EmptyStudents />;
  const ordered = [...progress].sort((a, b) => formatFirebaseDate(b.createdAt).localeCompare(formatFirebaseDate(a.createdAt)));
  return (
    <section className="dashboard-panel two-column">
      <form
        className="hindi-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (!studentId || !comment.trim()) return;
          runAction(() => addProgress(studentId, level, comment), 'Progress comment added.').then(() =>
            setComment('')
          );
        }}
      >
        <h2>Add progress update</h2>
        <label>
          Student
          <select value={studentId} onChange={(e) => setStudentId(e.target.value)} required>
            {students.map((student) => <option key={student.id} value={student.id}>{student.name}</option>)}
          </select>
        </label>
        <label>
          Current level
          <select value={level} onChange={(e) => setLevel(e.target.value as ProgressLevel)}>
            <option>Beginning</option>
            <option>Developing</option>
            <option>On track</option>
            <option>Excellent</option>
          </select>
        </label>
        <label>
          Teacher comment
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={5} required />
        </label>
        <button className="hindi-button" disabled={busy} type="submit">Post update</button>
      </form>
      <div>
        <h2>Recent progress</h2>
        <div className="feed-list">
          {ordered.length ? ordered.map((entry) => (
            <ProgressCard key={entry.id} entry={entry} student={students.find((s) => s.id === entry.studentId)} />
          )) : <p className="muted">No progress comments yet.</p>}
        </div>
      </div>
    </section>
  );
};

const HomeworkAdmin: React.FC<
  Pick<DashboardProps, 'students' | 'homework' | 'submissions' | 'busy' | 'runAction'>
> = ({ students, homework, submissions, busy, runAction }) => {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dueDate, setDueDate] = useState(CLASS_START);
  return (
    <section className="dashboard-panel two-column">
      <form
        className="hindi-form"
        onSubmit={(event) => {
          event.preventDefault();
          runAction(() => addHomework(title, instructions, dueDate), 'Homework assigned.').then(() => {
            setTitle('');
            setInstructions('');
          });
        }}
      >
        <h2>Assign homework</h2>
        <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} required /></label>
        <label>
          Instructions
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={5} required />
        </label>
        <label>Due date<input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required /></label>
        <button className="hindi-button" disabled={busy} type="submit">Assign homework</button>
      </form>
      <div>
        <h2>Assignments & submissions</h2>
        <div className="feed-list">
          {homework.length ? homework.map((assignment) => {
            const files = submissions.filter((submission) => submission.assignmentId === assignment.id);
            return (
              <article className="feed-card" key={assignment.id}>
                <div className="feed-card-heading">
                  <h3>{assignment.title}</h3>
                  <span className="date-chip">Due {formatDateOnly(assignment.dueDate)}</span>
                </div>
                <p>{assignment.instructions}</p>
                <strong className="submission-count">{files.length}/{students.length} submitted</strong>
                {files.map((submission) => (
                  <a className="submission-link" href={submission.fileUrl} target="_blank" rel="noreferrer" key={submission.id}>
                    📎 {students.find((s) => s.id === submission.studentId)?.name || 'Student'} — {submission.fileName}
                  </a>
                ))}
              </article>
            );
          }) : <p className="muted">No homework assigned yet.</p>}
        </div>
      </div>
    </section>
  );
};

const StudentsAdmin: React.FC<Pick<DashboardProps, 'students' | 'busy' | 'runAction'>> = ({
  students,
  busy,
  runAction,
}) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [importFile, setImportFile] = useState<File | null>(null);
  return (
    <section className="dashboard-panel two-column">
      <form
        className="hindi-form"
        onSubmit={(event) => {
          event.preventDefault();
          runAction(
            () => addStudent(name, grade, parentName, parentEmail, parentPhone),
            `${name} was enrolled.`
          ).then(() => {
            setName('');
            setGrade('');
            setParentName('');
            setParentEmail('');
            setParentPhone('');
          });
        }}
      >
        <h2>Enroll a student</h2>
        <p>The parent must sign in with the same email entered here.</p>
        <label>Student name<input value={name} onChange={(e) => setName(e.target.value)} required /></label>
        <label>Grade<input value={grade} onChange={(e) => setGrade(e.target.value)} required /></label>
        <label>Parent name<input value={parentName} onChange={(e) => setParentName(e.target.value)} required /></label>
        <label>Parent email<input type="email" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} required /></label>
        <label>Parent phone<input type="tel" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} required /></label>
        <button className="hindi-button" disabled={busy} type="submit">Add student</button>
        <div className="roster-import">
          <h3>Import class roster</h3>
          <p>CSV columns: First Name, Last Name, Grade, Parent Email, Parent Phone.</p>
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={(event) => setImportFile(event.target.files?.[0] || null)}
          />
          <button
            className="hindi-button secondary"
            disabled={busy || !importFile}
            type="button"
            onClick={() => {
              if (!importFile) return;
              runAction(async () => {
                const rows = parseRosterCsv(await importFile.text());
                if (!rows.length) throw new Error('The CSV does not contain any student rows.');
                await importStudents(rows);
              }, 'Class roster imported.').then(() => setImportFile(null));
            }}
          >
            Import roster
          </button>
        </div>
      </form>
      <div>
        <h2>Class roster</h2>
        <div className="student-list">
          {students.length ? students.map((student) => (
            <div className="student-row" key={student.id}>
              <StudentIdentity student={student} />
              <button
                className="danger-button"
                type="button"
                disabled={busy}
                onClick={() => {
                  if (window.confirm(`Remove ${student.name} from the class?`)) {
                    runAction(() => removeStudent(student.id), `${student.name} was removed.`);
                  }
                }}
              >
                Remove
              </button>
            </div>
          )) : <EmptyStudents />}
        </div>
      </div>
    </section>
  );
};

const ParentDashboard: React.FC<DashboardProps & { user: NonNullable<ReturnType<typeof useAuth>['user']> }> = ({
  user,
  students,
  attendance,
  progress,
  homework,
  submissions,
  busy,
  runAction,
}) => {
  if (!students.length) {
    return (
      <div className="empty-state parent-empty">
        <span>🔎</span>
        <h2>No student is linked to {user.email}</h2>
        <p>Ask the class administrator to use this exact email address on the student profile.</p>
      </div>
    );
  }
  return (
    <div className="parent-students">
      {students.map((student) => {
        const studentAttendance = attendance
          .filter((item) => item.studentId === student.id)
          .sort((a, b) => b.classDate.localeCompare(a.classDate));
        const studentProgress = progress.filter((item) => item.studentId === student.id);
        return (
          <section className="student-dashboard" key={student.id}>
            <div className="student-banner">
              <StudentIdentity student={student} />
              <span>{studentAttendance.filter((item) => item.status === 'present').length} classes attended</span>
            </div>
            <div className="parent-grid">
              <div className="dashboard-panel">
                <h2>Teacher feedback</h2>
                <div className="feed-list">
                  {studentProgress.length ? studentProgress.map((entry) => (
                    <ProgressCard key={entry.id} entry={entry} />
                  )) : <p className="muted">The teacher has not posted feedback yet.</p>}
                </div>
              </div>
              <div className="dashboard-panel">
                <h2>Attendance</h2>
                <div className="attendance-history">
                  {studentAttendance.length ? studentAttendance.map((record) => (
                    <div key={record.id}>
                      <span className={`attendance-dot ${record.status}`}></span>
                      <strong>{formatDateOnly(record.classDate)}</strong>
                      <span className="capitalize">{record.status}</span>
                      {record.note && <small>{record.note}</small>}
                    </div>
                  )) : <p className="muted">No attendance records yet.</p>}
                </div>
              </div>
            </div>
            <div className="dashboard-panel">
              <h2>Homework</h2>
              <div className="homework-grid">
                {homework.length ? homework.map((assignment) => (
                  <ParentHomeworkCard
                    key={assignment.id}
                    assignment={assignment}
                    student={student}
                    user={user}
                    submission={submissions.find(
                      (item) => item.assignmentId === assignment.id && item.studentId === student.id
                    )}
                    busy={busy}
                    runAction={runAction}
                  />
                )) : <p className="muted">No homework assigned yet.</p>}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

const ParentHomeworkCard: React.FC<{
  assignment: HomeworkAssignment;
  student: HindiStudent;
  user: NonNullable<ReturnType<typeof useAuth>['user']>;
  submission?: HomeworkSubmission;
  busy: boolean;
  runAction: DashboardProps['runAction'];
}> = ({ assignment, student, user, submission, busy, runAction }) => {
  const [file, setFile] = useState<File | null>(null);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      window.alert('Please choose a file smaller than 10 MB.');
      return;
    }
    runAction(
      () => uploadHomework(user, student, assignment, file),
      `${assignment.title} uploaded successfully.`
    ).then(() => setFile(null));
  };
  return (
    <article className="homework-card">
      <div className="feed-card-heading">
        <h3>{assignment.title}</h3>
        <span className="date-chip">Due {formatDateOnly(assignment.dueDate)}</span>
      </div>
      <p>{assignment.instructions}</p>
      {submission && (
        <a className="submitted-file" href={submission.fileUrl} target="_blank" rel="noreferrer">
          ✓ Submitted: {submission.fileName}
        </a>
      )}
      <form className="upload-form" onSubmit={submit}>
        <label>
          {submission ? 'Replace submission' : 'Upload completed homework'}
          <input
            type="file"
            accept={FILE_TYPES}
            onChange={(event) => setFile(event.target.files?.[0] || null)}
            required
          />
        </label>
        <button className="hindi-button" disabled={busy || !file} type="submit">Upload</button>
      </form>
      <small>PDF, Word, JPG or PNG • Maximum 10 MB</small>
    </article>
  );
};

const ProgressCard = ({ entry, student }: { entry: ProgressEntry; student?: HindiStudent }) => (
  <article className="feed-card">
    <div className="feed-card-heading">
      <div>
        {student && <strong>{student.name}</strong>}
        <h3>{entry.level}</h3>
      </div>
      <span className={`level-chip ${entry.level.toLowerCase().replace(' ', '-')}`}>{entry.level}</span>
    </div>
    <p>{entry.comment}</p>
    <small>{formatFirebaseDate(entry.createdAt) || 'Just now'}</small>
  </article>
);

const StudentIdentity = ({ student }: { student: HindiStudent }) => (
  <div className="student-identity">
    <span className="avatar">{student.name.charAt(0).toUpperCase()}</span>
    <div>
      <strong>{student.name}</strong>
      <small>
        {student.grade || 'Grade not set'} • {student.parentName || 'Parent'} • {student.parentEmail}
        {student.parentPhone ? ` • ${student.parentPhone}` : ''}
      </small>
    </div>
  </div>
);

function formatDateOnly(value: string): string {
  if (!value) return '';
  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getErrorMessage(error: unknown): string {
  const candidate = error as { code?: string; message?: string };
  if (candidate.code === 'auth/configuration-not-found') {
    return 'Google sign-in is not enabled yet. In Firebase Console, open Authentication → Get started → Google, enable it, choose a support email, and save.';
  }
  if (candidate.code === 'auth/operation-not-allowed') {
    return 'This sign-in provider is disabled. Enable it under Firebase Authentication → Sign-in method.';
  }
  if (candidate.code === 'permission-denied') {
    return 'You do not have permission for this action. Check the Hindi Classes Firebase rules and account role.';
  }
  if (candidate.code === 'auth/popup-closed-by-user') return 'Sign-in was cancelled.';
  if (candidate.code === 'auth/popup-blocked') return 'Allow pop-ups, then try signing in again.';
  return candidate.message || 'Something went wrong. Please try again.';
}

function parseRosterCsv(csv: string) {
  const lines = csv.replace(/^\uFEFF/, '').split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]).map((header) => header.trim().toLowerCase());
  const indexOf = (...names: string[]) => headers.findIndex((header) => names.includes(header));
  const firstNameIndex = indexOf('first name', 'firstname');
  const lastNameIndex = indexOf('last name', 'lastname');
  const gradeIndex = indexOf('grade', 'grade (fall)');
  const emailIndex = indexOf('parent email', 'email');
  const phoneIndex = indexOf('parent phone', 'phone');
  if ([firstNameIndex, lastNameIndex, gradeIndex, emailIndex, phoneIndex].some((index) => index < 0)) {
    throw new Error('CSV headers must include First Name, Last Name, Grade, Parent Email, and Parent Phone.');
  }

  return lines.slice(1).map((line, rowIndex) => {
    const values = parseCsvLine(line);
    const firstName = values[firstNameIndex]?.trim();
    const lastName = values[lastNameIndex]?.trim();
    const parentEmail = values[emailIndex]?.trim().toLowerCase();
    if (!firstName || !lastName || !parentEmail) {
      throw new Error(`Roster row ${rowIndex + 2} is missing a student name or parent email.`);
    }
    return {
      name: `${firstName} ${lastName}`,
      grade: values[gradeIndex]?.trim() || 'Not provided',
      parentName: 'Parent/Guardian',
      parentEmail,
      parentPhone: values[phoneIndex]?.trim() || '',
    };
  });
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let value = '';
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === ',' && !quoted) {
      values.push(value);
      value = '';
    } else {
      value += character;
    }
  }
  values.push(value);
  return values;
}

export default HindiClasses;
