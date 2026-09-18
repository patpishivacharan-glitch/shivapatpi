# Frontend Integration Guide

## API Configuration

### Environment Setup

Create `.env.local` file in the project root with the API URL:

```env
REACT_APP_API_URL=http://localhost:5000
# or for production:
REACT_APP_API_URL=https://shivapatpi-api.azurewebsites.net
```

### API Service Client

Create `src/services/apiClient.ts`:

```typescript
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE;
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    return response.json();
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    return response.json();
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    return response.json();
  }
}

export const apiClient = new ApiClient();
```

## Using the API in Components

### Students List Component

```typescript
import { useState, useEffect } from 'react';
import { apiClient, ApiResponse } from '../services/apiClient';

interface StudentDto {
  studentId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  grade: string;
  dateOfBirth?: Date;
  parentEmail: string;
  parentPhone: string;
  createdAt: Date;
}

export function StudentsGrid() {
  const [students, setStudents] = useState<StudentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<StudentDto[]>('/api/students', {
        skip: 0,
        take: 100,
      });

      if (response.success) {
        setStudents(response.data);
        setError(null);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="students-grid">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Grade</th>
            <th>DOB</th>
            <th>Parent Email</th>
            <th>Parent Phone</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.grade}</td>
              <td>{student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : 'N/A'}</td>
              <td>{student.parentEmail}</td>
              <td>{student.parentPhone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### Add Student Component

```typescript
import { FormEvent, useState } from 'react';
import { apiClient } from '../services/apiClient';

export function AddStudentForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    grade: '',
    dateOfBirth: '',
    parentEmail: '',
    parentPhone: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.post('/api/students', {
        ...formData,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : null,
      });

      if (response.success) {
        setMessage({ type: 'success', text: 'Student added successfully!' });
        setFormData({
          firstName: '',
          lastName: '',
          grade: '',
          dateOfBirth: '',
          parentEmail: '',
          parentPhone: '',
        });
      } else {
        setMessage({ type: 'error', text: response.message });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to add student' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="grade"
        placeholder="Grade"
        value={formData.grade}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
      />
      <input
        type="email"
        name="parentEmail"
        placeholder="Parent Email"
        value={formData.parentEmail}
        onChange={handleChange}
      />
      <input
        type="tel"
        name="parentPhone"
        placeholder="Parent Phone"
        value={formData.parentPhone}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Student'}
      </button>
      {message && <div className={`message ${message.type}`}>{message.text}</div>}
    </form>
  );
}
```

### Attendance Component

```typescript
import { useState, useEffect } from 'react';
import { apiClient } from '../services/apiClient';

interface AttendanceDto {
  attendanceId: number;
  studentId: number;
  attendanceDate: Date;
  status: string;
  notes: string;
}

export function AttendanceForm({ studentId }: { studentId: number }) {
  const [records, setRecords] = useState<AttendanceDto[]>([]);
  const [formData, setFormData] = useState({
    attendanceDate: new Date().toISOString().split('T')[0],
    status: 'Present',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAttendance();
  }, [studentId]);

  const loadAttendance = async () => {
    try {
      const response = await apiClient.get<AttendanceDto[]>(`/api/attendance/student/${studentId}`);
      if (response.success) {
        setRecords(response.data);
      }
    } catch (err) {
      console.error('Failed to load attendance records:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.post('/api/attendance', {
        studentId,
        attendanceDate: formData.attendanceDate,
        status: formData.status,
        notes: formData.notes,
      });

      if (response.success) {
        await loadAttendance();
        setFormData({
          attendanceDate: new Date().toISOString().split('T')[0],
          status: 'Present',
          notes: '',
        });
      }
    } catch (err) {
      console.error('Failed to add attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={formData.attendanceDate}
          onChange={(e) => setFormData((prev) => ({ ...prev, attendanceDate: e.target.value }))}
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
        >
          <option>Present</option>
          <option>Absent</option>
          <option>Late</option>
          <option>Excused</option>
        </select>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
          placeholder="Notes"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Add Attendance'}
        </button>
      </form>

      <div className="attendance-records">
        <h3>Attendance Records</h3>
        <ul>
          {records.map((record) => (
            <li key={record.attendanceId}>
              {new Date(record.attendanceDate).toLocaleDateString()} - {record.status}{' '}
              {record.notes && ` (${record.notes})`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

## API Endpoints Summary

### Students
- `GET /api/students` - List all students
- `GET /api/students/{id}` - Get student details with attendance & notes
- `POST /api/students` - Create student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

### Attendance
- `GET /api/attendance` - List attendance (filter by studentId, date range)
- `GET /api/attendance/student/{studentId}` - Get student's attendance
- `POST /api/attendance` - Add attendance
- `PUT /api/attendance/{id}` - Update attendance
- `DELETE /api/attendance/{id}` - Delete attendance

### Notes
- `GET /api/notes` - List notes (filter by studentId, category)
- `GET /api/notes/{id}` - Get note
- `GET /api/notes/student/{studentId}` - Get student's notes
- `POST /api/notes` - Create note
- `PUT /api/notes/{id}` - Update note
- `DELETE /api/notes/{id}` - Delete note

## Error Handling

All endpoints follow this response format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Handle errors in your components:

```typescript
try {
  const response = await apiClient.get('/api/students');
  if (response.success) {
    // Use response.data
  } else {
    // Handle error with response.message
    console.error(response.message);
  }
} catch (error) {
  // Handle network or parsing errors
  console.error('API call failed:', error);
}
```
