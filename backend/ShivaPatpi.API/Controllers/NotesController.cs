using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShivaPatpi.API.DTOs;
using ShivaPatpi.Data.DbContext;
using ShivaPatpi.Data.Models;

namespace ShivaPatpi.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly ShivaPatpiContext _context;
        private readonly ILogger<NotesController> _logger;

        public NotesController(ShivaPatpiContext context, ILogger<NotesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Get notes for a specific student
        /// </summary>
        [HttpGet("student/{studentId}")]
        public async Task<ActionResult<ApiResponse<List<NoteDto>>>> GetStudentNotes(int studentId)
        {
            try
            {
                var student = await _context.Students.FindAsync(studentId);
                if (student == null)
                {
                    return NotFound(ApiResponse<List<NoteDto>>.ErrorResponse($"Student with ID {studentId} not found"));
                }

                var notes = await _context.Notes
                    .Where(n => n.StudentId == studentId)
                    .OrderByDescending(n => n.NoteDate)
                    .Select(n => new NoteDto
                    {
                        NoteId = n.NoteId,
                        StudentId = n.StudentId,
                        NoteDate = n.NoteDate,
                        Category = n.Category,
                        Content = n.Content,
                        CreatedAt = n.CreatedAt,
                        UpdatedAt = n.UpdatedAt
                    })
                    .ToListAsync();

                return Ok(ApiResponse<List<NoteDto>>.SuccessResponse(notes, $"Retrieved {notes.Count} notes"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving notes for student {studentId}");
                return StatusCode(500, ApiResponse<List<NoteDto>>.ErrorResponse($"Internal server error: {ex.Message}"));
            }
        }

        /// <summary>
        /// Get all notes with optional filtering
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<NoteDto>>>> GetAllNotes([FromQuery] int? studentId = null, [FromQuery] string category = null)
        {
            try
            {
                var query = _context.Notes.AsQueryable();

                if (studentId.HasValue)
                    query = query.Where(n => n.StudentId == studentId);

                if (!string.IsNullOrEmpty(category))
                    query = query.Where(n => n.Category == category);

                var notes = await query
                    .OrderByDescending(n => n.NoteDate)
                    .Select(n => new NoteDto
                    {
                        NoteId = n.NoteId,
                        StudentId = n.StudentId,
                        NoteDate = n.NoteDate,
                        Category = n.Category,
                        Content = n.Content,
                        CreatedAt = n.CreatedAt,
                        UpdatedAt = n.UpdatedAt
                    })
                    .ToListAsync();

                return Ok(ApiResponse<List<NoteDto>>.SuccessResponse(notes, $"Retrieved {notes.Count} notes"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving notes");
                return StatusCode(500, ApiResponse<List<NoteDto>>.ErrorResponse($"Internal server error: {ex.Message}"));
            }
        }

        /// <summary>
        /// Get a specific note
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<NoteDto>>> GetNote(int id)
        {
            try
            {
                var note = await _context.Notes.FindAsync(id);
                if (note == null)
                {
                    return NotFound(ApiResponse<NoteDto>.ErrorResponse($"Note with ID {id} not found"));
                }

                var noteDto = new NoteDto
                {
                    NoteId = note.NoteId,
                    StudentId = note.StudentId,
                    NoteDate = note.NoteDate,
                    Category = note.Category,
                    Content = note.Content,
                    CreatedAt = note.CreatedAt,
                    UpdatedAt = note.UpdatedAt
                };

                return Ok(ApiResponse<NoteDto>.SuccessResponse(noteDto, "Note retrieved successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving note {id}");
                return StatusCode(500, ApiResponse<NoteDto>.ErrorResponse($"Internal server error: {ex.Message}"));
            }
        }

        /// <summary>
        /// Create a new note
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<NoteDto>>> CreateNote(CreateNoteDto createDto)
        {
            try
            {
                var student = await _context.Students.FindAsync(createDto.StudentId);
                if (student == null)
                {
                    return NotFound(ApiResponse<NoteDto>.ErrorResponse($"Student with ID {createDto.StudentId} not found"));
                }

                var note = new Note
                {
                    StudentId = createDto.StudentId,
                    NoteDate = createDto.NoteDate,
                    Category = createDto.Category,
                    Content = createDto.Content,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Notes.Add(note);
                await _context.SaveChangesAsync();

                var noteDto = new NoteDto
                {
                    NoteId = note.NoteId,
                    StudentId = note.StudentId,
                    NoteDate = note.NoteDate,
                    Category = note.Category,
                    Content = note.Content,
                    CreatedAt = note.CreatedAt,
                    UpdatedAt = note.UpdatedAt
                };

                return CreatedAtAction(nameof(GetNote), new { id = note.NoteId }, 
                    ApiResponse<NoteDto>.SuccessResponse(noteDto, "Note created successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating note");
                return StatusCode(500, ApiResponse<NoteDto>.ErrorResponse($"Internal server error: {ex.Message}"));
            }
        }

        /// <summary>
        /// Update a note
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<NoteDto>>> UpdateNote(int id, UpdateNoteDto updateDto)
        {
            try
            {
                var note = await _context.Notes.FindAsync(id);
                if (note == null)
                {
                    return NotFound(ApiResponse<NoteDto>.ErrorResponse($"Note with ID {id} not found"));
                }

                note.NoteDate = updateDto.NoteDate;
                note.Category = updateDto.Category ?? note.Category;
                note.Content = updateDto.Content ?? note.Content;
                note.UpdatedAt = DateTime.UtcNow;

                _context.Notes.Update(note);
                await _context.SaveChangesAsync();

                var noteDto = new NoteDto
                {
                    NoteId = note.NoteId,
                    StudentId = note.StudentId,
                    NoteDate = note.NoteDate,
                    Category = note.Category,
                    Content = note.Content,
                    CreatedAt = note.CreatedAt,
                    UpdatedAt = note.UpdatedAt
                };

                return Ok(ApiResponse<NoteDto>.SuccessResponse(noteDto, "Note updated successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating note {id}");
                return StatusCode(500, ApiResponse<NoteDto>.ErrorResponse($"Internal server error: {ex.Message}"));
            }
        }

        /// <summary>
        /// Delete a note
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<string>>> DeleteNote(int id)
        {
            try
            {
                var note = await _context.Notes.FindAsync(id);
                if (note == null)
                {
                    return NotFound(ApiResponse<string>.ErrorResponse($"Note with ID {id} not found"));
                }

                _context.Notes.Remove(note);
                await _context.SaveChangesAsync();

                return Ok(ApiResponse<string>.SuccessResponse("", "Note deleted successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting note {id}");
                return StatusCode(500, ApiResponse<string>.ErrorResponse($"Internal server error: {ex.Message}"));
            }
        }
    }
}
