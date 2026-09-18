import React, { useEffect, useState } from 'react';
import apiClient, { Student, AttendanceRecord, Note } from '../services/apiClient';
import '../styles/StudentsGrid.css';

interface StudentWithDetails extends Student {
  attendanceRecords?: AttendanceRecord[];
  notes?: Note[];
  attendancePercentage?: number;
}

export const StudentsGrid: React.FC = () => {
  const [students, setStudents] = useState<StudentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<StudentWithDetails | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all students
  useEffect(() => {
    fetchStudents();
  }, [pageNumber]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getStudents(pageNumber, 10);
      if ('data' in response && Array.isArray(response.data)) {
        setStudents(response.data as StudentWithDetails[]);
        setTotalPages((response as any).totalPages || 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load students');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentClick = async (student: Student) => {
    try {
      // Fetch attendance and notes for the student
      const attendanceResponse = await apiClient.getStudentAttendance(student.studentId);
      const notesResponse = await apiClient.getStudentNotes(student.studentId);

      const attendanceData = Array.isArray(attendanceResponse.data)
        ? attendanceResponse.data
        : [];
      const notesData = Array.isArray(notesResponse.data) ? notesResponse.data : [];

      // Calculate attendance percentage
      const present = attendanceData.filter((a) => a.status === 'Present').length;
      const attendancePercentage =
        attendanceData.length > 0 ? Math.round((present / attendanceData.length) * 100) : 0;

      setSelectedStudent({
        ...student,
        attendanceRecords: attendanceData,
        notes: notesData,
        attendancePercentage,
      });
      setShowModal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load student details');
    }
  };

  const handleDeleteStudent = async (studentId: number) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await apiClient.deleteStudent(studentId);
        fetchStudents();
        setShowModal(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete student');
      }
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && students.length === 0) {
    return <div className="loading">Loading students...</div>;
  }

  return (
    <div className="students-container">
      <div className="students-header">
        <h1>📚 Student Management</h1>
        <input
          type="text"
          placeholder="Search by name..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="students-grid">
        {filteredStudents.map((student) => (
          <div key={student.studentId} className="student-card" onClick={() => handleStudentClick(student)}>
            <div className="card-avatar">
              {student.firstName.charAt(0).toUpperCase()}
              {student.lastName.charAt(0).toUpperCase()}
            </div>
            <div className="card-content">
              <h3>{student.firstName} {student.lastName}</h3>
              <p className="grade">Grade: {student.grade}</p>
              <p className="dob">DOB: {new Date(student.dateOfBirth).toLocaleDateString()}</p>
              <p className="email">{student.parentEmail || 'No email'}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPageNumber(Math.max(1, pageNumber - 1))} disabled={pageNumber === 1}>
          ← Previous
        </button>
        <span>
          Page {pageNumber} of {totalPages}
        </span>
        <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === totalPages}>
          Next →
        </button>
      </div>

      {/* Student Details Modal */}
      {showModal && selectedStudent && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>

            <div className="modal-header">
              <h2>
                {selectedStudent.firstName} {selectedStudent.lastName}
              </h2>
            </div>

            <div className="modal-body">
              {/* Student Info */}
              <section className="modal-section">
                <h3>📋 Personal Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Grade:</label>
                    <span>{selectedStudent.grade}</span>
                  </div>
                  <div className="info-item">
                    <label>Date of Birth:</label>
                    <span>{new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                  <div className="info-item">
                    <label>Parent Email:</label>
                    <span>{selectedStudent.parentEmail || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <label>Parent Phone:</label>
                    <span>{selectedStudent.parentPhone || 'N/A'}</span>
                  </div>
                </div>
              </section>

              {/* Attendance Info */}
              <section className="modal-section">
                <h3>📅 Attendance</h3>
                {selectedStudent.attendanceRecords && selectedStudent.attendanceRecords.length > 0 ? (
                  <>
                    <div className="attendance-summary">
                      <div className="attendance-stat">
                        <span className="stat-label">Attendance Rate:</span>
                        <span className="stat-value">{selectedStudent.attendancePercentage}%</span>
                      </div>
                      <div className="attendance-stat">
                        <span className="stat-label">Total Records:</span>
                        <span className="stat-value">{selectedStudent.attendanceRecords.length}</span>
                      </div>
                    </div>
                    <div className="attendance-list">
                      {selectedStudent.attendanceRecords.slice(0, 5).map((record) => (
                        <div key={record.attendanceId} className={`attendance-item ${record.status.toLowerCase()}`}>
                          <span className="date">
                            {new Date(record.attendanceDate).toLocaleDateString()}
                          </span>
                          <span className={`status ${record.status.toLowerCase()}`}>{record.status}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="no-data">No attendance records</p>
                )}
              </section>

              {/* Notes Info */}
              <section className="modal-section">
                <h3>📝 Progress Notes</h3>
                {selectedStudent.notes && selectedStudent.notes.length > 0 ? (
                  <div className="notes-list">
                    {selectedStudent.notes.slice(0, 3).map((note) => (
                      <div key={note.noteId} className="note-item">
                        <div className="note-header">
                          <span className={`category ${note.category.toLowerCase()}`}>
                            {note.category}
                          </span>
                          <span className="note-date">
                            {new Date(note.noteDate).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="note-content">{note.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">No notes added</p>
                )}
              </section>
            </div>

            <div className="modal-footer">
              <button className="btn-delete" onClick={() => handleDeleteStudent(selectedStudent.studentId)}>
                Delete Student
              </button>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsGrid;
