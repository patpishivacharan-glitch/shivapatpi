using Microsoft.EntityFrameworkCore;
using ShivaPatpi.Data.Models;

namespace ShivaPatpi.Data.DbContext
{
    public class ShivaPatpiContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public ShivaPatpiContext(DbContextOptions<ShivaPatpiContext> options)
            : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Note> Notes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Student entity
            modelBuilder.Entity<Student>(entity =>
            {
                entity.HasKey(e => e.StudentId);
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Grade).HasMaxLength(50);
                entity.Property(e => e.ParentEmail).HasMaxLength(100);
                entity.Property(e => e.ParentPhone).HasMaxLength(20);
            });

            // Configure Attendance entity
            modelBuilder.Entity<Attendance>(entity =>
            {
                entity.HasKey(e => e.AttendanceId);
                entity.Property(e => e.Status).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Notes).HasMaxLength(500);
                
                entity.HasOne(e => e.Student)
                    .WithMany(s => s.AttendanceRecords)
                    .HasForeignKey(e => e.StudentId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Configure Note entity
            modelBuilder.Entity<Note>(entity =>
            {
                entity.HasKey(e => e.NoteId);
                entity.Property(e => e.Category).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Content).IsRequired();
                
                entity.HasOne(e => e.Student)
                    .WithMany(s => s.Notes)
                    .HasForeignKey(e => e.StudentId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
