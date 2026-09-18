# ShivaPatpi Project - Complete Setup Guide

This project consists of a React/TypeScript frontend and a .NET backend API for managing students, attendance, and progress notes.

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running Locally](#running-locally)
6. [Database Setup](#database-setup)
7. [Deployment](#deployment)
8. [API Documentation](#api-documentation)

## 📁 Project Structure

```
shivapatpi/
├── backend/                          # .NET Backend API
│   ├── ShivaPatpi.API/              # ASP.NET Core Web API
│   ├── ShivaPatpi.Data/             # EF Core Models & Migrations
│   ├── ShivaPatpi.Services/         # Business Logic
│   ├── README.md                    # Backend documentation
│   ├── test-api.ps1                 # PowerShell test script
│   └── test-api.sh                  # Bash test script
├── src/                              # React Frontend Source Code
├── public/                           # Static Files
├── package.json                      # Frontend Dependencies
├── .github/workflows/                # CI/CD Pipeline
│   ├── master_shivapatpi.yml        # Frontend deployment
│   └── backend-deploy.yml           # Backend deployment
├── BACKEND_DEPLOYMENT.md             # Azure backend deployment guide
├── FRONTEND_INTEGRATION.md           # Frontend API integration guide
└── DEPLOYMENT.md                    # Original frontend deployment guide
```

## 🔧 Prerequisites

### Global Requirements
- Git
- Visual Studio Code or IDE of choice
- Azure account with active subscription
- SQL Server with Azure SQL or local SQL Server

### Backend Requirements
- .NET 8.0 SDK or later
- Entity Framework Core tools: `dotnet tool install -g dotnet-ef`

### Frontend Requirements
- Node.js 18+ and npm
- React 18+
- TypeScript

## 🚀 Backend Setup

### 1. Install Dependencies

```bash
cd backend
dotnet restore
```

### 2. Configure Database Connection

Edit `backend/ShivaPatpi.API/appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=tcp:shpatpi.database.windows.net,1433;Initial Catalog=shivapatpi;Persist Security Info=False;User ID=shpatpi;Password=YOUR_PASSWORD;..."
  }
}
```

**Note**: The password should be `Microsoft143$` for the provided Azure SQL instance.

### 3. Setup Database

```bash
cd ShivaPatpi.API
dotnet ef database update -p ..\ShivaPatpi.Data\ShivaPatpi.Data.csproj
```

Or for migrations:
```bash
dotnet ef migrations add MigrationName -p ..\ShivaPatpi.Data\ShivaPatpi.Data.csproj
```

### 4. Build & Test

```bash
cd ..
dotnet build
dotnet test
```

## 💻 Frontend Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env.local`:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Build

```bash
npm run build
```

## ▶️ Running Locally

### Terminal 1 - Backend API

```bash
cd backend/ShivaPatpi.API
dotnet run
```

The API will start at:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`
- Swagger UI: `https://localhost:5001/swagger`

### Terminal 2 - Frontend

```bash
npm start
```

The frontend will start at:
- `http://localhost:3000` (default)
- or `http://localhost:5173` (if using Vite)

### Access the Application

1. Frontend: `http://localhost:3000`
2. Backend API: `http://localhost:5000/api/students`
3. API Documentation: `http://localhost:5000/swagger`

## 🗄️ Database Setup

### Azure SQL Server

Connection details:
- **Server**: `shpatpi.database.windows.net`
- **Database**: `shivapatpi`
- **Username**: `shpatpi`
- **Password**: `Microsoft143$`

### Local SQL Server (Alternative)

For local development with SQL Server Express:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=shivapatpi;Trusted_Connection=true;"
  }
}
```

## 📦 Database Structure

### Students Table
- StudentId (PK)
- FirstName
- LastName
- Grade
- DateOfBirth
- ParentEmail
- ParentPhone
- CreatedAt
- UpdatedAt

### Attendance Table
- AttendanceId (PK)
- StudentId (FK)
- AttendanceDate
- Status (Present/Absent/Late/Excused)
- Notes
- CreatedAt
- UpdatedAt

### Notes Table
- NoteId (PK)
- StudentId (FK)
- NoteDate
- Category (Academic/Behavioral/Progress/General)
- Content
- CreatedAt
- UpdatedAt

## 🌐 API Endpoints

### Students
```
GET    /api/students                 # List students
GET    /api/students/{id}            # Get student details
POST   /api/students                 # Create student
PUT    /api/students/{id}            # Update student
DELETE /api/students/{id}            # Delete student
```

### Attendance
```
GET    /api/attendance               # List attendance
GET    /api/attendance/student/{id}  # Get student attendance
POST   /api/attendance               # Add attendance
PUT    /api/attendance/{id}          # Update attendance
DELETE /api/attendance/{id}          # Delete attendance
```

### Notes
```
GET    /api/notes                    # List notes
GET    /api/notes/{id}               # Get note
GET    /api/notes/student/{id}       # Get student notes
POST   /api/notes                    # Create note
PUT    /api/notes/{id}               # Update note
DELETE /api/notes/{id}               # Delete note
```

## 🔍 Testing the API

### Using PowerShell (Windows)
```bash
.\backend\test-api.ps1
# or with custom URL:
.\backend\test-api.ps1 -BaseUrl "https://shivapatpi-api.azurewebsites.net"
```

### Using Bash (Linux/Mac)
```bash
bash backend/test-api.sh
# or with custom URL:
bash backend/test-api.sh https://shivapatpi-api.azurewebsites.net
```

### Using Swagger UI
Navigate to `http://localhost:5000/swagger` for interactive API documentation.

## 🚢 Deployment

### Backend Deployment (Azure)

See [BACKEND_DEPLOYMENT.md](./BACKEND_DEPLOYMENT.md) for detailed instructions:

1. Create Azure Web App (.NET 8)
2. Configure Application Settings & Connection Strings
3. Add GitHub Secrets (publish profile)
4. Push to master branch - automatic deployment via GitHub Actions

### Frontend Deployment (Azure)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for original instructions:

1. Create Azure Web App (Node.js)
2. Configure GitHub deployment
3. Push to master branch - automatic deployment

### API Management (Optional)

To add backend API to Azure API Management:

1. Create API Management instance
2. Add API → From function app or Web App
3. Configure API settings and policies
4. Setup subscriptions and rate limiting

## 📚 Documentation

- **Backend**: See `backend/README.md`
- **Frontend Integration**: See `FRONTEND_INTEGRATION.md`
- **Deployment**: See `BACKEND_DEPLOYMENT.md` and `DEPLOYMENT.md`

## 🔑 Key Features

✅ Full-stack CRUD operations for students
✅ Attendance tracking with status management
✅ Progress notes with categories
✅ RESTful API with Swagger documentation
✅ Entity Framework Core with SQL Server
✅ CORS enabled for frontend-backend communication
✅ Automated data seeding from Level1.xlsx
✅ GitHub Actions CI/CD pipeline
✅ Azure deployment ready
✅ Responsive frontend with React

## 🐛 Troubleshooting

### Backend Issues

**Build fails**
```bash
dotnet clean
dotnet restore
dotnet build
```

**Database connection error**
- Verify connection string in appsettings.json
- Check SQL Server credentials
- Ensure database exists

**Port already in use**
```bash
# Change port in Properties/launchSettings.json
# or use different port:
dotnet run --urls "https://localhost:5002"
```

### Frontend Issues

**API calls fail**
- Verify backend is running
- Check `.env.local` has correct `REACT_APP_API_URL`
- Check browser console for CORS errors

**Dependency conflicts**
```bash
npm ci  # Use package-lock.json instead of package.json
```

## 📝 Development Workflow

1. Make changes to frontend or backend
2. Test locally
3. Commit to git
4. Push to master branch
5. GitHub Actions automatically builds and deploys
6. Verify deployment in Azure Portal

## 🔒 Security Notes

- Database credentials stored in Azure Key Vault (production)
- Connection strings not committed to repository
- HTTPS enforced in Azure
- CORS configured to allow only specific origins (configurable)
- SQL injection prevented via parameterized queries (EF Core)

## 📊 Performance Tips

- Use pagination for large student lists
- Cache frequently accessed data
- Implement database indexes on foreign keys
- Monitor Azure Application Insights
- Scale up App Service plan if needed

## 🎓 Student Data

The system includes all 25 students from the Level1.xlsx file with:
- Full names
- Grades
- Parent contact information
- Date of birth (estimated from context)

These are automatically seeded when the application starts.

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review GitHub Actions logs for deployment errors
3. Check Azure Application Insights for runtime errors
4. Review detailed logs in Azure Portal → Web App → Log stream

## ✨ Future Enhancements

- [ ] Authentication & Authorization (JWT/Azure AD)
- [ ] File uploads (photos, documents)
- [ ] Email notifications
- [ ] Advanced reporting & analytics
- [ ] Mobile app
- [ ] Real-time updates with SignalR
- [ ] API versioning
- [ ] Rate limiting & throttling
- [ ] Comprehensive test coverage
- [ ] Docker containerization

## 📄 License

This project is private to the ShivaPatpi organization.
