namespace ShivaPatpi.Data.Models
{
    public class Student
    {
        public int StudentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Grade { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string ParentEmail { get; set; }
        public string ParentPhone { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public ICollection<Attendance> AttendanceRecords { get; set; } = new List<Attendance>();
        public ICollection<Note> Notes { get; set; } = new List<Note>();
    }
}
