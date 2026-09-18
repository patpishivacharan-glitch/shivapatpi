#!/usr/bin/env powershell
<#
.SYNOPSIS
    API Testing Script for ShivaPatpi Backend

.PARAMETER BaseUrl
    The base URL of the API (default: http://localhost:5000)

.EXAMPLE
    .\test-api.ps1
    .\test-api.ps1 -BaseUrl "https://shivapatpi-api.azurewebsites.net"
#>

param(
    [string]$BaseUrl = "http://localhost:5000"
)

Write-Host "=== ShivaPatpi Backend API Tests ===" -ForegroundColor Green
Write-Host "Base URL: $BaseUrl" -ForegroundColor Cyan
Write-Host ""

function Test-Endpoint {
    param(
        [string]$Method,
        [string]$Endpoint,
        [object]$Data = $null
    )
    
    Write-Host "Testing: $Method $Endpoint" -ForegroundColor Yellow
    
    $url = "$BaseUrl$Endpoint"
    $headers = @{ "Content-Type" = "application/json" }
    
    try {
        if ($Data) {
            $body = $Data | ConvertTo-Json -Depth 10
            $response = Invoke-RestMethod -Uri $url -Method $Method -Headers $headers -Body $body
        }
        else {
            $response = Invoke-RestMethod -Uri $url -Method $Method -Headers $headers
        }
        
        $response | ConvertTo-Json -Depth 10 | Write-Host
    }
    catch {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
}

# 1. Get all students
Write-Host "1. Get All Students" -ForegroundColor Green
Test-Endpoint -Method GET -Endpoint "/api/students?skip=0&take=10"

# 2. Get first student
Write-Host "2. Get Student by ID" -ForegroundColor Green
Test-Endpoint -Method GET -Endpoint "/api/students/1"

# 3. Create a new student
Write-Host "3. Create New Student" -ForegroundColor Green
$studentData = @{
    firstName = "Test"
    lastName = "Student"
    grade = "3rd Grade"
    dateOfBirth = "2015-05-15"
    parentEmail = "parent@test.com"
    parentPhone = "(555) 123-4567"
}
Test-Endpoint -Method POST -Endpoint "/api/students" -Data $studentData

# 4. Get all attendance records
Write-Host "4. Get All Attendance Records" -ForegroundColor Green
Test-Endpoint -Method GET -Endpoint "/api/attendance"

# 5. Get attendance for first student
Write-Host "5. Get Student Attendance" -ForegroundColor Green
Test-Endpoint -Method GET -Endpoint "/api/attendance/student/1"

# 6. Add attendance record
Write-Host "6. Add Attendance Record" -ForegroundColor Green
$attendanceData = @{
    studentId = 1
    attendanceDate = (Get-Date -Format "yyyy-MM-dd")
    status = "Present"
    notes = "Test attendance record"
}
Test-Endpoint -Method POST -Endpoint "/api/attendance" -Data $attendanceData

# 7. Get all notes
Write-Host "7. Get All Notes" -ForegroundColor Green
Test-Endpoint -Method GET -Endpoint "/api/notes"

# 8. Add a note
Write-Host "8. Add Note" -ForegroundColor Green
$noteData = @{
    studentId = 1
    noteDate = (Get-Date -Format "yyyy-MM-dd")
    category = "Academic"
    content = "Student showing good progress in math"
}
Test-Endpoint -Method POST -Endpoint "/api/notes" -Data $noteData

# 9. Swagger
Write-Host "9. Swagger Documentation" -ForegroundColor Green
Write-Host "Visit: $BaseUrl/swagger" -ForegroundColor Cyan
Write-Host ""

Write-Host "=== Tests Complete ===" -ForegroundColor Green
