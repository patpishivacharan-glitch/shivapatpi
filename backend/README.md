# ShivaPatpi Backend API

A C#.NET REST API for managing student data, including attendance tracking and progress notes.

## Architecture

The solution is organized into three main projects:

### ShivaPatpi.Data
Contains the database models, Entity Framework Core context, and migrations.

**Models:**
- `Student` - Student profile with personal and contact information
- `Attendance` - Attendance records for tracking student presence
- `Note` - Progress notes and observations for each student

**Database Connection:**
- Uses Azure SQL Server: `shpatpi.database.windows.net`
- Database: `shivapatpi`
- Connection string configured in `appsettings.json`

### ShivaPatpi.API
ASP.NET Core Web API providing RESTful endpoints for managing students, attendance, and notes.

**Controllers:**
- `StudentsController` - CRUD operations for students
- `AttendanceController` - Attendance record management
- `NotesController` - Progress notes management

### ShivaPatpi.Services
Business logic and service layer (expandable for future use).

## Project Setup

### Prerequisites
- .NET 8.0 SDK or later
- SQL Server access credentials
- Visual Studio 2022 or VS Code with C# extension

### Database Setup

1. Update the connection string in `appsettings.Development.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=tcp:shpatpi.database.windows.net,1433;Initial Catalog=shivapatpi;Persist Security Info=False;User ID=shpatpi;Password=YOUR_PASSWORD;..."
  }
}
```

2. Apply migrations to create database tables:
```bash
cd ShivaPatpi.API
dotnet ef database update -p ..\ShivaPatpi.Data\ShivaPatpi.Data.csproj
```

### Local Development

1. Install dependencies:
```bash
dotnet restore
```

2. Build the solution:
```bash
dotnet build
```

3. Run the API:
```bash
cd ShivaPatpi.API
dotnet run
```

The API will be available at: `https://localhost:5001` (HTTPS) or `http://localhost:5000` (HTTP)

## API Endpoints

### Students
- `GET /api/students` - Get all students with pagination (skip, take params)
- `GET /api/students/{id}` - Get student details with attendance and notes
- `POST /api/students` - Create a new student
- `PUT /api/students/{id}` - Update student information
- `DELETE /api/students/{id}` - Delete a student

### Attendance
- `GET /api/attendance` - Get all attendance records (filterable by studentId, date range)
- `GET /api/attendance/student/{studentId}` - Get attendance for specific student
- `POST /api/attendance` - Add attendance record
- `PUT /api/attendance/{id}` - Update attendance record
- `DELETE /api/attendance/{id}` - Delete attendance record

### Notes
- `GET /api/notes` - Get all notes (filterable by studentId, category)
- `GET /api/notes/{id}` - Get specific note
- `GET /api/notes/student/{studentId}` - Get notes for specific student
- `POST /api/notes` - Create new note
- `PUT /api/notes/{id}` - Update note
- `DELETE /api/notes/{id}` - Delete note

## API Response Format

All endpoints return a consistent response format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

## CORS Configuration

The API is configured with CORS for development and production:

**Development:** Allows `localhost:3000`, `localhost:5173`, `https://localhost:5173`
**Production:** Allows all origins (can be restricted in `Program.cs`)

## Configuration

Configuration files:
- `appsettings.json` - Base configuration with placeholder connection string
- `appsettings.Development.json` - Development overrides (includes real credentials, not committed)
- Environment variables can override settings

## Deployment

### Azure Deployment

1. **Create Azure Web App:**
   - Go to Azure Portal
   - Create new Web App
   - Runtime: .NET 8 (Linux or Windows)
   - Configure publish settings

2. **GitHub Secrets Setup:**
   Add to repository secrets:
   - `AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND` - The publish profile XML from Azure

3. **Automatic Deployment:**
   Push to `master` branch with changes in `/backend` folder
   GitHub Actions will automatically build and deploy via `.github/workflows/backend-deploy.yml`

### Manual Deployment

1. Publish the application:
```bash
dotnet publish ShivaPatpi.API/ShivaPatpi.API.csproj -c Release -o ./publish
```

2. Deploy to Azure using the publish profile or Azure CLI

## Database Migrations

Create a new migration after model changes:
```bash
cd ShivaPatpi.API
dotnet ef migrations add MigrationName -p ..\ShivaPatpi.Data\ShivaPatpi.Data.csproj
```

Update the database:
```bash
dotnet ef database update -p ..\ShivaPatpi.Data\ShivaPatpi.Data.csproj
```

## Security Considerations

- Connection string stored in Azure Key Vault in production
- Sensitive credentials not committed to GitHub
- SQL Server configured with IP whitelisting
- Consider adding authentication/authorization for production

## Frontend Integration

To call these API endpoints from the React frontend:

```typescript
// API base URL (configure based on environment)
const API_BASE = process.env.REACT_APP_API_URL || 'https://shivapatpi-api.azurewebsites.net';

// Fetch all students
fetch(`${API_BASE}/api/students`)
  .then(res => res.json())
  .then(data => console.log(data.data));

// Create new student
fetch(`${API_BASE}/api/students`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    grade: '3rd Grade',
    parentEmail: 'parent@email.com',
    parentPhone: '555-1234',
    dateOfBirth: '2018-01-15'
  })
})
```

## Troubleshooting

**Connection refused error:**
- Verify Azure SQL Server IP whitelist includes your current IP
- Check connection string in appsettings.json

**Migration errors:**
- Ensure Entity Framework tools are installed: `dotnet tool install -g dotnet-ef`
- Check database credentials and network access

**CORS errors:**
- Verify frontend URL is in allowed origins in Program.cs
- Check browser console for exact error

## Support

For issues or questions, create a GitHub issue in the repository.
