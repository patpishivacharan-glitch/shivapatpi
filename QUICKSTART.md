# 🚀 Quick Start Guide

Get the ShivaPatpi application running in 5 minutes!

## Prerequisites

- .NET 8.0 SDK
- Node.js 18+
- Git

## Backend Setup (Terminal 1)

```bash
cd backend/ShivaPatpi.API

# Restore NuGet packages
dotnet restore

# Run the API
dotnet run
```

**API will start at**: `http://localhost:5000`
**Swagger docs**: `http://localhost:5000/swagger`

## Frontend Setup (Terminal 2)

```bash
# Install dependencies
npm install

# Update API URL in .env.local (if not localhost:5000)
echo "REACT_APP_API_URL=http://localhost:5000" > .env.local

# Start the app
npm start
```

**App will open at**: `http://localhost:3000`

## That's It! 

You now have:
- ✅ Backend API running with Student, Attendance, and Notes management
- ✅ Frontend React app with grid view of students
- ✅ All 25 students pre-populated from Level1.xlsx
- ✅ Full CRUD operations for students, attendance, and notes
- ✅ Interactive Swagger API documentation

## Test the API

### Using PowerShell:
```bash
.\backend\test-api.ps1
```

### Using Curl:
```bash
curl http://localhost:5000/api/students
```

### Using Swagger:
Navigate to `http://localhost:5000/swagger` in your browser

## Common Tasks

### Add a Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "grade": "3rd Grade",
    "dateOfBirth": "2015-05-20",
    "parentEmail": "john@example.com",
    "parentPhone": "(555) 123-4567"
  }'
```

### Mark Attendance
```bash
curl -X POST http://localhost:5000/api/attendance \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "attendanceDate": "2026-09-17",
    "status": "Present"
  }'
```

### Add a Note
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "noteDate": "2026-09-17",
    "category": "Academic",
    "content": "Good progress in math"
  }'
```

## Frontend Components

Create React components to display the API data. See `FRONTEND_INTEGRATION.md` for detailed examples.

**Example**: Students Grid Component
```tsx
function StudentsGrid() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then(res => res.json())
      .then(data => setStudents(data.data));
  }, []);

  return (
    <table>
      <tbody>
        {students.map(s => (
          <tr key={s.studentId}>
            <td>{s.firstName} {s.lastName}</td>
            <td>{s.grade}</td>
            <td>{s.dateOfBirth}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## Database

The API automatically:
- ✅ Creates database tables on first run
- ✅ Applies migrations
- ✅ Seeds all 25 students from Level1.xlsx

**Connection String** (in `appsettings.Development.json`):
```
Server=tcp:shpatpi.database.windows.net,1433;Initial Catalog=shivapatpi;
User ID=shpatpi;Password=Microsoft143$;Encrypt=True;
```

## Troubleshooting

**Port already in use?**
```bash
# Use a different port:
dotnet run --urls "https://localhost:5002"
# Update REACT_APP_API_URL in .env.local
```

**Can't connect to database?**
- Verify connection string in `appsettings.Development.json`
- Check Azure SQL credentials
- Ensure your IP is whitelisted

**API calls failing?**
- Verify backend is running: `http://localhost:5000/swagger`
- Check browser console for errors
- Verify CORS is enabled (it is by default)

## Next Steps

1. ✅ **Read** `PROJECT_SETUP.md` for detailed configuration
2. ✅ **Explore** `FRONTEND_INTEGRATION.md` for React integration examples
3. ✅ **Follow** `BACKEND_DEPLOYMENT.md` to deploy to Azure
4. ✅ **Review** `backend/README.md` for API documentation

## API Endpoints Quick Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/students` | List all students |
| GET | `/api/students/{id}` | Get student with attendance & notes |
| POST | `/api/students` | Create student |
| PUT | `/api/students/{id}` | Update student |
| DELETE | `/api/students/{id}` | Delete student |
| POST | `/api/attendance` | Add attendance |
| GET | `/api/attendance/student/{id}` | Get student attendance |
| POST | `/api/notes` | Add note |
| GET | `/api/notes/student/{id}` | Get student notes |

## Response Format

All API responses follow this format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* actual data */ }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

## Support

- 📖 See `PROJECT_SETUP.md` for complete setup guide
- 🚀 See `BACKEND_DEPLOYMENT.md` for Azure deployment
- 🎨 See `FRONTEND_INTEGRATION.md` for React examples
- 📚 See `backend/README.md` for API details

---

**Happy coding! 🎉**
