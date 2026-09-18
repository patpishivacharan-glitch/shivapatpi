using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShivaPatpi.API.DTOs;
using ShivaPatpi.Data.DbContext;
using ShivaPatpi.Data.Models;

namespace ShivaPatpi.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly ShivaPatpiContext _context;
        private readonly ILogger<AttendanceController> _logger;

        public AttendanceController(ShivaPatpiContext context, ILogger<AttendanceController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Get attendance records for a student
        /// </summary>
        [HttpGet("student/{studentId}")]
        public async Task<ActionResult<ApiResponse<List<AttendanceDto>>>> GetStudentAttendance(int studentId)
        {
            try
            {
                var student = await _context.Students.FindAsync(studentId);
                if (student == null)
                {
                    return NotFound(ApiResponse<List<AttendanceDto>>.ErrorResponse($"Student with ID {studentId} not found"));
                }

                var attendanceRecords = await _context.Attendances
                    .Where(a => a.StudentId == studentId)
                    .OrderByDescending(a => a.AttendanceDate)
                    .Select(a => new AttendanceDto
                    {
                        AttendanceId = a.AttendanceId,
                        StudentId = a.StudentId,
                        AttendanceDate = a.AttendanceDate,
                        Status = a.Status,
                        Notes = a.Notes,
                        CreatedAt = a.CreatedAt,
                        UpdatedAt = a.UpdatedAt
                    })
                    .ToListAsync();

                return Ok(ApiResponse<List<AttendanceDto>>.SuccessResponse(attendanceRecords, $"Retrieved {attendanceRecords.Count} attendance records"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving attendance for student {studentId}");
                return StatusCode(500, ApiResponse<List<AttendanceDto>>.ErrorResponse($"Internal server error: {ex.Message}"));
            }
        }

        /// <summary>
        /// Get all attendance records with optional filtering
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<AttendanceDto>>>> GetAllAttendance([FromQuery] int? studentId = null, [FromQuery] DateTime? fromDate = null, [FromQuery] DateTime? toDate = null)
        {
            try
            {
                var query = _context.Attendances.AsQueryable();

                if (studentId.HasValue)
                    query = query.Where(a => a.StudentId == studentId);

                if (fromDate.HasValue)
                    query = query.Where(a => a.AttendanceDate >= fromDate);

                if (toDate.HasValue)
                    query = query.Where(a => a.AttendanceDate <= toDate);

                var records = await query
                    .OrderByDescending(a => a.AttendanceDate)
                    .Select(a => new AttendanceDto
                    {
                        AttendanceId = a.AttendanceId,
                        StudentId = a.StudentId,
                        AttendanceDate = a.AttendanceDate,
                        Status = a.Status,
                        Notes = a.Notes,
                        CreatedAt = a.CreatedAt,
                        UpdatedAt = a.UpdatedAt
                    })
                    .ToListAsync();

                return Ok(ApiResponse<List<AttendanceDto>>.SuccessResponse(records, $"Retrieved {records.Count} attendance records"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving attendance records");
                return StatusCode(500, ApiResponse<List<AttendanceDto>>.ErrorResponse($"Internal server error: {ex.Message}"));
            }
        }

        /// <summary>
        /// Create attendance record
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<AttendanceDto>>> CreateAttendance(CreateAttendanceDto createDto)
        {
            try
            {
                var student = await _context.Students.FindAsync(createDto.StudentId);
                if (student == null)
                {
                    return NotFound(ApiResponse<AttendanceDto>.ErrorResponse($"Student with ID {createDto.StudentId} not found"));
                }

                var attendance = new Attendance
                {
                    StudentId = createDto.StudentId,
                    AttendanceDate = createDto.AttendanceDate,
                    Status = createDto.Status,
                    Notes = createDto.Notes,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Attendances.Add(attendance);
                await _context.SaveChangesAsync();

                var attendanceDto = new AttendanceDto
                {
                    AttendanceId = attendance.AttendanceId,
                    StudentId = attendance.StudentId,
                    AttendanceDate = attendance.AttendanceDate,
                    Status = attendance.Status,
                    Notes = attendance.Notes,
                    CreatedAt = attendance.CreatedAt,
                    UpdatedAt = attendance.UpdatedAt
                };

                return CreatedAtAction(nameof(GetStudentAttendance), new { studentId = attendance.StudentId }, 
                    ApiResponse<AttendanceDto>.SuccessResponse(attendanceDto, "Attendance record created successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating attendance record");
                return StatusCode(500, ApiResponse<AttendanceDto>.ErrorResponse($"Internal server error: {ex.Message}"));
            }
        }

        /// <summary>
        /// Update attendance record
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<AttendanceDto>>> UpdateAttendance(int id, UpdateAttendanceDto updateDto)
        {
            try
            {
                var attendance = await _context.Attendances.FindAsync(id);
                if (attendance == null)
                {
                    return NotFound(ApiResponse<AttendanceDto>.ErrorResponse($"Attendance record with ID {id} not found"));
                }

                attendance.AttendanceDate = updateDto.AttendanceDate;
                attendance.Status = updateDto.Status ?? attendance.Status;
                attendance.Notes = updateDto.Notes ?? attendance.Notes;
                attendance.UpdatedAt = DateTime.UtcNow;

                _context.Attendances.Update(attendance);
                await _context.SaveChangesAsync();

                var attendanceDto = new AttendanceDto
                {
                    AttendanceId = attendance.AttendanceId,
                    StudentId = attendance.StudentId,
                    AttendanceDate = attendance.AttendanceDate,
                    Status = attendance.Status,
                    Notes = attendance.Notes,
                    CreatedAt = attendance.CreatedAt,
                    UpdatedAt = attendance.UpdatedAt
                };

                return Ok(ApiResponse<AttendanceDto>.SuccessResponse(attendanceDto, "Attendance record updated successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating attendance record {id}");
                return StatusCode(500, ApiResponse<AttendanceDto>.ErrorResponse($"Internal server error: {ex.Message}"));
            }
        }

        /// <summary>
        /// Delete attendance record
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<string>>> DeleteAttendance(int id)
        {
            try
            {
                var attendance = await _context.Attendances.FindAsync(id);
                if (attendance == null)
                {
                    return NotFound(ApiResponse<string>.ErrorResponse($"Attendance record with ID {id} not found"));
                }

                _context.Attendances.Remove(attendance);
                await _context.SaveChangesAsync();

                return Ok(ApiResponse<string>.SuccessResponse("", "Attendance record deleted successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting attendance record {id}");
                return StatusCode(500, ApiResponse<string>.ErrorResponse($"Internal server error: {ex.Message}"));
            }
        }
    }
}
