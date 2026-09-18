namespace ShivaPatpi.Data.Models
{
    public class Note
    {
        public int NoteId { get; set; }
        public int StudentId { get; set; }
        public DateTime NoteDate { get; set; }
        public string Category { get; set; } // "Academic", "Behavioral", "Progress", "General"
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Foreign key navigation
        public Student Student { get; set; }
    }
}
