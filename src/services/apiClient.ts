/**
 * API Client for communicating with ShivaPatpi Backend API
 * Handles all requests to Students, Attendance, and Notes endpoints
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  grade: string;
  dateOfBirth: string;
  parentEmail?: string;
  parentPhone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceRecord {
  attendanceId: number;
  studentId: number;
  attendanceDate: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  notes?: string;
  createdAt: string;
}

export interface Note {
  noteId: number;
  studentId: number;
  noteDate: string;
  category: 'Academic' | 'Behavioral' | 'Progress' | 'General';
  content: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T> | PaginatedResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // ==================== STUDENTS ====================

  async getStudents(pageNumber: number = 1, pageSize: number = 10) {
    return this.request<Student[]>(
      `/students?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { method: 'GET' }
    );
  }

  async getStudent(studentId: number) {
    return this.request<Student>(`/students/${studentId}`, {
      method: 'GET',
    });
  }

  async createStudent(student: Omit<Student, 'studentId' | 'createdAt' | 'updatedAt'>) {
    return this.request<Student>('/students', {
      method: 'POST',
      body: JSON.stringify(student),
    });
  }

  async updateStudent(
    studentId: number,
    student: Partial<Omit<Student, 'studentId' | 'createdAt' | 'updatedAt'>>
  ) {
    return this.request<Student>(`/students/${studentId}`, {
      method: 'PUT',
      body: JSON.stringify(student),
    });
  }

  async deleteStudent(studentId: number) {
    return this.request<void>(`/students/${studentId}`, {
      method: 'DELETE',
    });
  }

  // ==================== ATTENDANCE ====================

  async getAttendance(pageNumber: number = 1, pageSize: number = 10) {
    return this.request<AttendanceRecord[]>(
      `/attendance?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { method: 'GET' }
    );
  }

  async getStudentAttendance(studentId: number) {
    return this.request<AttendanceRecord[]>(
      `/attendance/student/${studentId}`,
      { method: 'GET' }
    );
  }

  async createAttendance(attendance: Omit<AttendanceRecord, 'attendanceId' | 'createdAt'>) {
    return this.request<AttendanceRecord>('/attendance', {
      method: 'POST',
      body: JSON.stringify(attendance),
    });
  }

  async updateAttendance(
    attendanceId: number,
    attendance: Partial<Omit<AttendanceRecord, 'attendanceId' | 'createdAt'>>
  ) {
    return this.request<AttendanceRecord>(`/attendance/${attendanceId}`, {
      method: 'PUT',
      body: JSON.stringify(attendance),
    });
  }

  async deleteAttendance(attendanceId: number) {
    return this.request<void>(`/attendance/${attendanceId}`, {
      method: 'DELETE',
    });
  }

  // ==================== NOTES ====================

  async getNotes(pageNumber: number = 1, pageSize: number = 10) {
    return this.request<Note[]>(
      `/notes?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { method: 'GET' }
    );
  }

  async getNote(noteId: number) {
    return this.request<Note>(`/notes/${noteId}`, {
      method: 'GET',
    });
  }

  async getStudentNotes(studentId: number) {
    return this.request<Note[]>(`/notes/student/${studentId}`, {
      method: 'GET',
    });
  }

  async createNote(note: Omit<Note, 'noteId' | 'createdAt'>) {
    return this.request<Note>('/notes', {
      method: 'POST',
      body: JSON.stringify(note),
    });
  }

  async updateNote(noteId: number, note: Partial<Omit<Note, 'noteId' | 'createdAt'>>) {
    return this.request<Note>(`/notes/${noteId}`, {
      method: 'PUT',
      body: JSON.stringify(note),
    });
  }

  async deleteNote(noteId: number) {
    return this.request<void>(`/notes/${noteId}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiClient();
