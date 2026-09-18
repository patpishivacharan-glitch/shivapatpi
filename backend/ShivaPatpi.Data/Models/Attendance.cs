namespace ShivaPatpi.Data.Models
{
    public class Attendance
    {
        public int AttendanceId { get; set; }
        public int StudentId { get; set; }
        public DateTime AttendanceDate { get; set; }
        public string Status { get; set; } // "Present", "Absent", "Late", "Excused"
        public string Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Foreign key navigation
        public Student Student { get; set; }
    }
}
