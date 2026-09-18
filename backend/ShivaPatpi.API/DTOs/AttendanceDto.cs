namespace ShivaPatpi.API.DTOs
{
    public class AttendanceDto
    {
        public int AttendanceId { get; set; }
        public int StudentId { get; set; }
        public DateTime AttendanceDate { get; set; }
        public string Status { get; set; }
        public string Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateAttendanceDto
    {
        public int StudentId { get; set; }
        public DateTime AttendanceDate { get; set; }
        public string Status { get; set; }
        public string Notes { get; set; }
    }

    public class UpdateAttendanceDto
    {
        public DateTime AttendanceDate { get; set; }
        public string Status { get; set; }
        public string Notes { get; set; }
    }
}
