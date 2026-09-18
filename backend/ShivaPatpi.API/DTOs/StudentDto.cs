namespace ShivaPatpi.API.DTOs
{
    public class StudentDto
    {
        public int StudentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{FirstName} {LastName}";
        public string Grade { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string ParentEmail { get; set; }
        public string ParentPhone { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateStudentDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Grade { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string ParentEmail { get; set; }
        public string ParentPhone { get; set; }
    }

    public class UpdateStudentDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Grade { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string ParentEmail { get; set; }
        public string ParentPhone { get; set; }
    }

    public class StudentDetailDto
    {
        public int StudentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{FirstName} {LastName}";
        public string Grade { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string ParentEmail { get; set; }
        public string ParentPhone { get; set; }
        public List<AttendanceDto> AttendanceRecords { get; set; } = new();
        public List<NoteDto> Notes { get; set; } = new();
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
