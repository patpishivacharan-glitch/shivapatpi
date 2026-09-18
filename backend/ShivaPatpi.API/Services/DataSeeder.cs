using ShivaPatpi.Data.DbContext;
using ShivaPatpi.Data.Models;

namespace ShivaPatpi.API.Services
{
    public class DataSeeder
    {
        public static async Task SeedStudentsAsync(ShivaPatpiContext context)
        {
            if (context.Students.Any())
            {
                return; // Db already seeded
            }

            // Seed students from Level1.xlsx data
            var students = new List<Student>
            {
                new Student
                {
                    FirstName = "Madhav",
                    LastName = "Sharma",
                    Grade = "1st",
                    ParentEmail = "dhiraj190018@gmail.com",
                    ParentPhone = "(206) 822-1415",
                    DateOfBirth = new DateTime(2017, 01, 15),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Riana",
                    LastName = "Jain",
                    Grade = "1st Grade",
                    ParentEmail = "swetajain84@gmail.com",
                    ParentPhone = "(425) 246-2978",
                    DateOfBirth = new DateTime(2017, 03, 22),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Mishka",
                    LastName = "Mohnani",
                    Grade = "2",
                    ParentEmail = "neha.monga@gmail.com",
                    ParentPhone = "(206) 419-8245",
                    DateOfBirth = new DateTime(2016, 05, 10),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Ved",
                    LastName = "Penta",
                    Grade = "3",
                    ParentEmail = "nkpenta@gmail.com",
                    ParentPhone = "(302) 562-3245",
                    DateOfBirth = new DateTime(2015, 07, 18),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Sanav",
                    LastName = "Rajeev",
                    Grade = "3",
                    ParentEmail = "PAVI.SUNDAR2024@GMAIL.COM",
                    ParentPhone = "(954) 994-9634",
                    DateOfBirth = new DateTime(2015, 09, 08),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Abhiraj",
                    LastName = "Sharma",
                    Grade = "3",
                    ParentEmail = "abhinav19@gmail.com",
                    ParentPhone = "(412) 616-0499",
                    DateOfBirth = new DateTime(2015, 11, 25),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Saanvi",
                    LastName = "Shree",
                    Grade = "3",
                    ParentEmail = "anuprose.sugandh@gmail.com",
                    ParentPhone = "(206) 310-5103",
                    DateOfBirth = new DateTime(2015, 02, 14),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Ambica",
                    LastName = "Jain",
                    Grade = "3rd grade",
                    ParentEmail = "Ambica.clc@gmail.com",
                    ParentPhone = "(425) 503-4984",
                    DateOfBirth = new DateTime(2015, 06, 30),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Shivaansh",
                    LastName = "Srinivasan",
                    Grade = "4th",
                    ParentEmail = "bhavana.rajshekar@gmail.com",
                    ParentPhone = "(765) 4048781",
                    DateOfBirth = new DateTime(2014, 08, 05),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Yuvaan",
                    LastName = "Kumar",
                    Grade = "4th grade",
                    ParentEmail = "priyanka.lachhwani@outlook.com",
                    ParentPhone = "(425) 362-0229",
                    DateOfBirth = new DateTime(2014, 10, 12),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Aadvika",
                    LastName = "Mishra",
                    Grade = "5th Grade",
                    ParentEmail = "roma.blr1@gmail.com",
                    ParentPhone = "(980) 636-0578",
                    DateOfBirth = new DateTime(2013, 04, 20),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Samaira",
                    LastName = "Koujalagi",
                    Grade = "First Grade",
                    ParentEmail = "rajat.koujalagi@gmail.com",
                    ParentPhone = "(352) 871-5199",
                    DateOfBirth = new DateTime(2017, 12, 08),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Inaaya",
                    LastName = "Vasistha",
                    Grade = "Going preschool",
                    ParentEmail = "s.shefaligarg@gmail.com",
                    ParentPhone = "(979) 985-7495",
                    DateOfBirth = new DateTime(2018, 06, 15),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Sri Aadhya",
                    LastName = "Pathuri",
                    Grade = "Grade 2",
                    ParentEmail = "j.lakshmisowjanya@gmail.com",
                    ParentPhone = "(425) 623-7120",
                    DateOfBirth = new DateTime(2016, 03, 28),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Hruday",
                    LastName = "G",
                    Grade = "Grade 3",
                    ParentEmail = "harinigeerlapally@gmail.com",
                    ParentPhone = "(630) 373-9337",
                    DateOfBirth = new DateTime(2015, 08, 11),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Devina",
                    LastName = "Mohan",
                    Grade = "Grade 3",
                    ParentEmail = "devina.mohan@gmail.com",
                    ParentPhone = "(213) 400-1782",
                    DateOfBirth = new DateTime(2015, 09, 22),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Adithi",
                    LastName = "G",
                    Grade = "Grade 5",
                    ParentEmail = "harinigeerlapally@gmail.com",
                    ParentPhone = "(630) 373-9337",
                    DateOfBirth = new DateTime(2013, 05, 19),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Adhyan",
                    LastName = "Sinha",
                    Grade = "KG",
                    ParentEmail = "kajri.sr@gmail.com",
                    ParentPhone = "(206) 475-6593",
                    DateOfBirth = new DateTime(2019, 07, 10),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Radha",
                    LastName = "Shah",
                    Grade = "Kindergarten",
                    ParentEmail = "njd788@gmail.com",
                    ParentPhone = "(206) 512-5547",
                    DateOfBirth = new DateTime(2019, 04, 25),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Aarohi",
                    LastName = "Singla",
                    Grade = "Kindergarten",
                    ParentEmail = "roohi.sood@gmail.com",
                    ParentPhone = "(206) 790-9571",
                    DateOfBirth = new DateTime(2019, 09, 14),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Rhea",
                    LastName = "Verma",
                    Grade = "Pre-K",
                    ParentEmail = "mail@pramodk.com",
                    ParentPhone = "(224) 241-7360",
                    DateOfBirth = new DateTime(2020, 02, 17),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Dia",
                    LastName = "Verma",
                    Grade = "Pre-K",
                    ParentEmail = "mail@pramodk.com",
                    ParentPhone = "(224) 241-7360",
                    DateOfBirth = new DateTime(2020, 05, 03),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Misha",
                    LastName = "Gupta",
                    Grade = "Pre-K",
                    ParentEmail = "contactsgaa@gmail.com",
                    ParentPhone = "(206) 822-7509",
                    DateOfBirth = new DateTime(2020, 08, 09),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Rihaan",
                    LastName = "Mohnani",
                    Grade = "PreK",
                    ParentEmail = "neha.monga@gmail.com",
                    ParentPhone = "(206) 419-8245",
                    DateOfBirth = new DateTime(2020, 11, 21),
                    CreatedAt = DateTime.UtcNow
                },
                new Student
                {
                    FirstName = "Krish",
                    LastName = "Garhewal",
                    Grade = "Preschool",
                    ParentEmail = "vineet.garhewal@gmail.com",
                    ParentPhone = "(425) 247-5051",
                    DateOfBirth = new DateTime(2020, 01, 06),
                    CreatedAt = DateTime.UtcNow
                }
            };

            await context.Students.AddRangeAsync(students);
            await context.SaveChangesAsync();
        }
    }
}
