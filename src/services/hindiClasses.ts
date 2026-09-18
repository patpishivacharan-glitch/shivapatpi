import { User } from 'firebase/auth';
import { getFirebaseAuth } from '../firebase';

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

export interface HindiClassData {
  students: HindiStudent[];
  attendance: AttendanceRecord[];
  progress: ProgressEntry[];
  homework: HomeworkAssignment[];
  submissions: HomeworkSubmission[];
  isAdmin: boolean;
}

export type HindiStudentImport = Pick<
  HindiStudent,
  'name' | 'grade' | 'parentName' | 'parentEmail' | 'parentPhone'
>;

const DATA_CHANGED_EVENT = 'hindi-classes-data-changed';
const REFRESH_INTERVAL_MS = 10000;

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const user = getFirebaseAuth().currentUser;
  if (!user) throw new Error('Please sign in again.');

  const token = await user.getIdToken();
  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${token}`);
  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`/api/hindi${path}`, { ...options, headers });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const error = new Error(body?.error || `Request failed with status ${response.status}.`) as Error & {
      code?: string;
    };
    if (response.status === 401) error.code = 'unauthenticated';
    if (response.status === 403) error.code = 'permission-denied';
    throw error;
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

function notifyDataChanged() {
  window.dispatchEvent(new Event(DATA_CHANGED_EVENT));
}

export function subscribeToHindiClassData(
  role: 'admin' | 'parent',
  onData: (data: HindiClassData) => void,
  onError: (error: Error) => void
): () => void {
  let active = true;
  let loading = false;

  const load = async () => {
    if (!active || loading) return;
    loading = true;
    try {
      const data = await apiRequest<HindiClassData>(`/data?role=${role}`);
      if (active) onData(data);
    } catch (error) {
      if (active) onError(error as Error);
    } finally {
      loading = false;
    }
  };

  const interval = window.setInterval(load, REFRESH_INTERVAL_MS);
  window.addEventListener(DATA_CHANGED_EVENT, load);
  load();

  return () => {
    active = false;
    window.clearInterval(interval);
    window.removeEventListener(DATA_CHANGED_EVENT, load);
  };
}

export async function addStudent(
  name: string,
  grade: string,
  parentName: string,
  parentEmail: string,
  parentPhone: string
): Promise<void> {
  await apiRequest('/students', {
    method: 'POST',
    body: JSON.stringify({ name, grade, parentName, parentEmail, parentPhone }),
  });
  notifyDataChanged();
}

export async function importStudents(students: HindiStudentImport[]): Promise<void> {
  await apiRequest('/students/import', {
    method: 'POST',
    body: JSON.stringify({ students }),
  });
  notifyDataChanged();
}

export async function removeStudent(studentId: string): Promise<void> {
  await apiRequest(`/students/${encodeURIComponent(studentId)}`, { method: 'DELETE' });
  notifyDataChanged();
}

export async function saveAttendance(
  studentId: string,
  classDate: string,
  status: AttendanceStatus,
  note: string
): Promise<void> {
  await apiRequest(
    `/attendance/${encodeURIComponent(studentId)}/${encodeURIComponent(classDate)}`,
    {
      method: 'PUT',
      body: JSON.stringify({ status, note }),
    }
  );
  notifyDataChanged();
}

export async function addProgress(
  studentId: string,
  level: ProgressLevel,
  comment: string
): Promise<void> {
  await apiRequest('/progress', {
    method: 'POST',
    body: JSON.stringify({ studentId, level, comment }),
  });
  notifyDataChanged();
}

export async function addHomework(
  title: string,
  instructions: string,
  dueDate: string
): Promise<void> {
  await apiRequest('/homework', {
    method: 'POST',
    body: JSON.stringify({ title, instructions, dueDate }),
  });
  notifyDataChanged();
}

export async function uploadHomework(
  _user: User,
  student: HindiStudent,
  assignment: HomeworkAssignment,
  file: File
): Promise<void> {
  const body = new FormData();
  body.append('studentId', student.id);
  body.append('assignmentId', assignment.id);
  body.append('file', file);
  await apiRequest('/submissions', { method: 'POST', body });
  notifyDataChanged();
}

export function formatFirebaseDate(value: any): string {
  if (!value) return '';
  const date = typeof value.toDate === 'function' ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}
