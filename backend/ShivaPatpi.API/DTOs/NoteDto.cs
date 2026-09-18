namespace ShivaPatpi.API.DTOs
{
    public class NoteDto
    {
        public int NoteId { get; set; }
        public int StudentId { get; set; }
        public DateTime NoteDate { get; set; }
        public string Category { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateNoteDto
    {
        public int StudentId { get; set; }
        public DateTime NoteDate { get; set; }
        public string Category { get; set; }
        public string Content { get; set; }
    }

    public class UpdateNoteDto
    {
        public DateTime NoteDate { get; set; }
        public string Category { get; set; }
        public string Content { get; set; }
    }
}
