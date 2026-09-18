using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShivaPatpi.API.DTOs;
using ShivaPatpi.Data.DbContext;
using ShivaPatpi.Data.Models;

namespace ShivaPatpi.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly ShivaPatpiContext _context;
        private readonly ILogger<StudentsController> _logger;

        public StudentsController(ShivaPatpiContext context, ILogger<StudentsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Get all students with optional pagination
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<StudentDto>>>> GetStudents([FromQuery] int skip = 0, [FromQuery] int take = 100)
        {
            try
            {
                var students = await _context.Students
                    .Skip(skip)
                    .Take(take)
                    .Select(s => new StudentDto
                    {
                        StudentId = s.StudentId,
                        FirstName = s.FirstName,
                        LastName = s.LastName,
                        Grade = s.Grade,
                        DateOfBirth = s.DateOfBirth,
                        ParentEmail = s.ParentEmail,
                        ParentPhone = s.ParentPhone,
                        CreatedAt = s.CreatedAt,
                        UpdatedAt = s.UpdatedAt
                    })
                    .ToListAsync();

                return Ok(ApiResponse<List<StudentDto>>.SuccessResponse(students, $"Retrieved {students.Count} students"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving students");
                return StatusCode(500, ApiResponse<List<StudentDto>>.ErrorResponse($"Internal server error: {ex.Message}"));
            }
        }

        /// <summary>
        /// Get student by ID with attendance and notes
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<StudentDetailDto>>> GetStudent(int id)
        {
            try
            {
                var student = await _context.Students
                    .Include(s => s.AttendanceRecords)
                    .Include(s => s.Notes)
                    .FirstOrDefaultAsync(s => s.StudentId == id);

                if (student == null)
                {
                    return NotFound(ApiResponse<StudentDetailDto>.ErrorResponse($"Student with ID {id} not found"));
                }

                var studentDetail = new StudentDetailDto
                {
                    StudentId = student.StudentId,
                    FirstName = student.FirstName,
                    LastName = student.LastName,
                    Grade = student.Grade,
                    DateOfBirth = student.DateOfBirth,
                    ParentEmail = student.ParentEmail,
                    ParentPhone = student.ParentPhone,
                    CreatedAt = student.CreatedAt,
                    UpdatedAt = student.UpdatedAt,
                    AttendanceRecords = student.AttendanceRecords.Select(a => new AttendanceDto
                    {
                        AttendanceId = a.AttendanceId,
                        StudentId = a.StudentId,
                        AttendanceDate = a.AttendanceDate,
                        Status = a.Status,
                        Notes = a.Notes,
                        CreatedAt = a.CreatedAt,
                        UpdatedAt = a.UpdatedAt
                    }).ToList(),
                    Notes = student.Notes.Select(n => new NoteDto
                    {
                        NoteId = n.NoteId,
                        StudentId = n.StudentId,
                        NoteDate = n.NoteDate,
                        Category = n.Category,
                        Content = n.Content,
                        CreatedAt = n.CreatedAt,
                        UpdatedAt = n.UpdatedAt
                    }).ToList()
                };

                return Ok(ApiResponse<StudentDetailDto>.SuccessResponse(studentDetail, "Student retrieved successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving student {id}");
                return StatusCode(500, ApiResponse<StudentDetailDto>.ErrorResponse($"Internal server error: {ex.Message}"));
            }
        }

        /// <summary>
        /// Create a new student
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<StudentDto>>> CreateStudent(CreateStudentDto createDto)
        {
            try
            {
                var student = new Student
                {
                    FirstName = createDto.FirstName,
                    LastName = createDto.LastName,
                    Grade = createDto.Grade,
                    DateOfBirth = createDto.DateOfBirth,
                    ParentEmail = createDto.ParentEmail,
                    ParentPhone = createDto.ParentPhone,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Students.Add(student);
                await _context.SaveChangesAsync();

                var studentDto = new StudentDto
                {
                    StudentId = student.StudentId,
                    FirstName = student.FirstName,
                    LastName = student.LastName,
                    Grade = student.Grade,
                    DateOfBirth = student.DateOfBirth,
                    ParentEmail = student.ParentEmail,
                    ParentPhone = student.ParentPhone,
                    CreatedAt = student.CreatedAt,
                    UpdatedAt = student.UpdatedAt
                };

                return CreatedAtAction(nameof(GetStudent), new { id = student.StudentId }, 
                    ApiResponse<StudentDto>.SuccessResponse(studentDto, "Student created successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating student");
                return StatusCode(500, ApiResponse<StudentDto>.ErrorResponse($"Internal server error: {ex.Message}"));
            }
        }

        /// <summary>
        /// Update an existing student
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<StudentDto>>> UpdateStudent(int id, UpdateStudentDto updateDto)
        {
            try
            {
                var student = await _context.Students.FindAsync(id);
                if (student == null)
                {
                    return NotFound(ApiResponse<StudentDto>.ErrorResponse($"Student with ID {id} not found"));
                }

                student.FirstName = updateDto.FirstName ?? student.FirstName;
                student.LastName = updateDto.LastName ?? student.LastName;
                student.Grade = updateDto.Grade ?? student.Grade;
                student.DateOfBirth = updateDto.DateOfBirth ?? student.DateOfBirth;
                student.ParentEmail = updateDto.ParentEmail ?? student.ParentEmail;
                student.ParentPhone = updateDto.ParentPhone ?? student.ParentPhone;
                student.UpdatedAt = DateTime.UtcNow;

                _context.Students.Update(student);
                await _context.SaveChangesAsync();

                var studentDto = new StudentDto
                {
                    StudentId = student.StudentId,
                    FirstName = student.FirstName,
                    LastName = student.LastName,
                    Grade = student.Grade,
                    DateOfBirth = student.DateOfBirth,
                    ParentEmail = student.ParentEmail,
                    ParentPhone = student.ParentPhone,
                    CreatedAt = student.CreatedAt,
                    UpdatedAt = student.UpdatedAt
                };

                return Ok(ApiResponse<StudentDto>.SuccessResponse(studentDto, "Student updated successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating student {id}");
                return StatusCode(500, ApiResponse<StudentDto>.ErrorResponse($"Internal server error: {ex.Message}"));
            }
        }

        /// <summary>
        /// Delete a student
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<string>>> DeleteStudent(int id)
        {
            try
            {
                var student = await _context.Students.FindAsync(id);
                if (student == null)
                {
                    return NotFound(ApiResponse<string>.ErrorResponse($"Student with ID {id} not found"));
                }

                _context.Students.Remove(student);
                await _context.SaveChangesAsync();

                return Ok(ApiResponse<string>.SuccessResponse("", "Student deleted successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting student {id}");
                return StatusCode(500, ApiResponse<string>.ErrorResponse($"Internal server error: {ex.Message}"));
            }
        }
    }
}
