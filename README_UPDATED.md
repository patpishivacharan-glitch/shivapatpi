# ShivaPatpi - Student Management Application

A full-stack application for managing students, attendance tracking, and progress notes. Built with React/TypeScript frontend and C#.NET backend API, deployed on Azure.

## 📊 Project Overview

**Problem**: Managing student information, attendance, and progress notes manually
**Solution**: Comprehensive web application with easy-to-use interface and powerful backend API

**Key Features**:
- ✅ Student management (CRUD operations)
- ✅ Attendance tracking with status management
- ✅ Progress notes with categorization
- ✅ Interactive grid view for students
- ✅ RESTful API with full documentation
- ✅ Responsive React frontend
- ✅ Azure cloud deployment
- ✅ Automated CI/CD pipeline

## 🚀 Quick Start

Want to get started right now? See **[QUICKSTART.md](./QUICKSTART.md)**

```bash
# Terminal 1: Start Backend
cd backend/ShivaPatpi.API && dotnet run

# Terminal 2: Start Frontend
npm install && npm start
```

Visit `http://localhost:3000` - Done!

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [QUICKSTART.md](./QUICKSTART.md) | Get running in 5 minutes |
| [PROJECT_SETUP.md](./PROJECT_SETUP.md) | Complete project setup guide |
| [BACKEND_DEPLOYMENT.md](./BACKEND_DEPLOYMENT.md) | Azure deployment instructions |
| [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md) | React component examples |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Original frontend deployment |
| [backend/README.md](./backend/README.md) | Backend API documentation |

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│         React Frontend (SPA)                 │
│    - Students Grid View                      │
│    - Add/Edit/Delete Students               │
│    - Attendance Management                  │
│    - Progress Notes                         │
└───────────────┬─────────────────────────────┘
                │ (HTTP/REST)
                ▼
┌─────────────────────────────────────────────┐
│    ASP.NET Core 8.0 Backend API             │
│    - Students Controller                    │
│    - Attendance Controller                  │
│    - Notes Controller                       │
│    - CORS Enabled                           │
│    - Swagger Documentation                  │
└───────────────┬─────────────────────────────┘
                │ (SQL)
                ▼
┌─────────────────────────────────────────────┐
│    Azure SQL Server Database                │
│    - Students Table                         │
│    - Attendance Table                       │
│    - Notes Table                            │
└─────────────────────────────────────────────┘
```

## 📁 Directory Structure

```
shivapatpi/
├── backend/                          # .NET Backend (see backend/README.md)
│   ├── ShivaPatpi.API/              # ASP.NET Core Web API
│   ├── ShivaPatpi.Data/             # EF Core models & migrations
│   ├── ShivaPatpi.Services/         # Business logic layer
│   ├── README.md                    # Backend documentation
│   ├── test-api.ps1                 # PowerShell API tests
│   └── test-api.sh                  # Bash API tests
├── src/                              # React Frontend Source
│   ├── components/                  # React components
│   ├── services/                    # API services
│   └── App.tsx                      # Main app component
├── public/                           # Static assets
├── .github/
│   └── workflows/                   # GitHub Actions CI/CD
│       ├── master_shivapatpi.yml   # Frontend deploy
│       └── backend-deploy.yml      # Backend deploy
├── package.json                      # Frontend dependencies
├── tsconfig.json                    # TypeScript config
└── [Documentation Files]
    ├── QUICKSTART.md                # 5-minute setup
    ├── PROJECT_SETUP.md             # Complete setup
    ├── BACKEND_DEPLOYMENT.md        # Azure backend guide
    ├── FRONTEND_INTEGRATION.md      # React integration guide
    └── DEPLOYMENT.md                # Frontend deployment
```

## 🛠️ Technology Stack

### Frontend
- **React 18+** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Axios/Fetch** - HTTP client
- **CSS** - Styling

### Backend
- **.NET 8.0** - Runtime
- **ASP.NET Core** - Web framework
- **Entity Framework Core** - ORM
- **SQL Server** - Database

### Cloud & DevOps
- **Azure Web App** - Hosting
- **Azure SQL Database** - Database server
- **Azure Key Vault** - Secrets management
- **GitHub Actions** - CI/CD pipeline
- **Azure API Management** - API gateway (optional)

## 📋 Database Schema

### Students Table
```sql
CREATE TABLE Students (
    StudentId INT PRIMARY KEY IDENTITY,
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Grade NVARCHAR(50),
    DateOfBirth DATETIME2,
    ParentEmail NVARCHAR(100),
    ParentPhone NVARCHAR(20),
    CreatedAt DATETIME2,
    UpdatedAt DATETIME2
);
```

### Attendance Table
```sql
CREATE TABLE Attendances (
    AttendanceId INT PRIMARY KEY IDENTITY,
    StudentId INT NOT NULL FOREIGN KEY,
    AttendanceDate DATETIME2,
    Status NVARCHAR(20) NOT NULL,
    Notes NVARCHAR(500),
    CreatedAt DATETIME2,
    UpdatedAt DATETIME2
);
```

### Notes Table
```sql
CREATE TABLE Notes (
    NoteId INT PRIMARY KEY IDENTITY,
    StudentId INT NOT NULL FOREIGN KEY,
    NoteDate DATETIME2,
    Category NVARCHAR(50) NOT NULL,
    Content NVARCHAR(MAX),
    CreatedAt DATETIME2,
    UpdatedAt DATETIME2
);
```

## 🔌 API Endpoints

### Students
```http
GET    /api/students?skip=0&take=100      # List students
GET    /api/students/{id}                 # Get student + details
POST   /api/students                      # Create student
PUT    /api/students/{id}                 # Update student
DELETE /api/students/{id}                 # Delete student
```

### Attendance
```http
GET    /api/attendance?studentId=1        # Filter attendance
GET    /api/attendance/student/{id}       # Get student attendance
POST   /api/attendance                    # Add attendance
PUT    /api/attendance/{id}               # Update attendance
DELETE /api/attendance/{id}               # Delete attendance
```

### Notes
```http
GET    /api/notes?studentId=1&category=Academic  # Filter notes
GET    /api/notes/{id}                   # Get note
GET    /api/notes/student/{id}           # Get student notes
POST   /api/notes                        # Create note
PUT    /api/notes/{id}                   # Update note
DELETE /api/notes/{id}                   # Delete note
```

See [backend/README.md](./backend/README.md) for detailed endpoint documentation.

## 🚀 Deployment

### Local Development
1. Install prerequisites (.NET 8, Node.js 18+)
2. Follow [QUICKSTART.md](./QUICKSTART.md)
3. Access at `http://localhost:3000`

### Azure Production
1. See [BACKEND_DEPLOYMENT.md](./BACKEND_DEPLOYMENT.md) for backend
2. See [DEPLOYMENT.md](./DEPLOYMENT.md) for frontend
3. Push to master branch - automatic deployment via GitHub Actions

### Database
- **Development**: Connect to Azure SQL or local SQL Server
- **Production**: Use Azure SQL Database
- Connection string in `appsettings.json` or Azure Key Vault

## 📊 Data

The application comes with 25 students pre-loaded from Level1.xlsx:
- Madhav Sharma, Riana Jain, Mishka Mohnani, and 22 others
- All in Kindergarten through 5th Grade
- With parent contact information
- Dates of birth estimated from school year

## 🔐 Security

- ✅ **HTTPS only** in production
- ✅ **Connection strings** stored in Azure Key Vault
- ✅ **Passwords** never committed to repository
- ✅ **CORS** properly configured
- ✅ **SQL injection** prevented via EF Core
- ✅ **Prepared statements** for all database queries

## 📈 Performance

- **Pagination** for large student lists
- **Connection pooling** for database
- **Async/await** for all I/O operations
- **Swagger caching** for documentation
- **Lazy loading** of related data

## 🧪 Testing

Test the API with included scripts:

**PowerShell (Windows)**:
```bash
.\backend\test-api.ps1
.\backend\test-api.ps1 -BaseUrl "https://shivapatpi-api.azurewebsites.net"
```

**Bash (Linux/Mac)**:
```bash
bash backend/test-api.sh
bash backend/test-api.sh https://shivapatpi-api.azurewebsites.net
```

**Interactive Swagger UI**:
- Local: `http://localhost:5000/swagger`
- Production: `https://shivapatpi-api.azurewebsites.net/swagger`

## 🐛 Troubleshooting

See [PROJECT_SETUP.md](./PROJECT_SETUP.md) for common issues and solutions:
- Database connection problems
- Port conflicts
- CORS errors
- API call failures
- Deployment issues

## 📞 Support & Documentation

- **Quick Start**: [QUICKSTART.md](./QUICKSTART.md)
- **Complete Setup**: [PROJECT_SETUP.md](./PROJECT_SETUP.md)
- **Backend API**: [backend/README.md](./backend/README.md)
- **Deployment**: [BACKEND_DEPLOYMENT.md](./BACKEND_DEPLOYMENT.md)
- **Frontend**: [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)

## ✨ Future Roadmap

- [ ] User authentication (JWT/Azure AD)
- [ ] Role-based access control
- [ ] File uploads (photos, documents)
- [ ] Email notifications to parents
- [ ] Advanced reporting & analytics
- [ ] Mobile app (React Native)
- [ ] Real-time updates (SignalR)
- [ ] API rate limiting
- [ ] Comprehensive test suite
- [ ] Docker containerization

## 📄 Project Information

- **Created**: September 2026
- **Status**: Active Development
- **License**: Private (ShivaPatpi Organization)
- **Repository**: https://github.com/patpishivacharan-glitch/shivapatpi

## 👥 Team

- Frontend Development: React/TypeScript
- Backend Development: C#/.NET
- DevOps: GitHub Actions, Azure

## 🎯 Getting Help

1. **Read the docs** - Start with [QUICKSTART.md](./QUICKSTART.md)
2. **Check logs** - Review Azure Application Insights
3. **GitHub Actions** - Check workflow run logs
4. **Create an issue** - Report bugs or request features

---

**Ready to get started?** 👉 See [QUICKSTART.md](./QUICKSTART.md)

**Want details?** 👉 See [PROJECT_SETUP.md](./PROJECT_SETUP.md)

**Deploying?** 👉 See [BACKEND_DEPLOYMENT.md](./BACKEND_DEPLOYMENT.md)
