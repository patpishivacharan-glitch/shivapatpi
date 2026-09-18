#!/usr/bin/env bash
# API Testing Script

BASE_URL="${1:-http://localhost:5000}"

echo "=== ShivaPatpi Backend API Tests ==="
echo "Base URL: $BASE_URL"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Test function
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    
    echo "Testing: $method $endpoint"
    
    if [ -n "$data" ]; then
        curl -s -X "$method" \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$BASE_URL$endpoint" | jq . || echo "Failed"
    else
        curl -s -X "$method" \
            -H "Content-Type: application/json" \
            "$BASE_URL$endpoint" | jq . || echo "Failed"
    fi
    
    echo ""
}

# 1. Get all students
echo -e "${GREEN}1. Get All Students${NC}"
test_endpoint GET "/api/students?skip=0&take=10"

# 2. Get first student (assuming ID 1 exists after seeding)
echo -e "${GREEN}2. Get Student by ID${NC}"
test_endpoint GET "/api/students/1"

# 3. Create a new student
echo -e "${GREEN}3. Create New Student${NC}"
test_endpoint POST "/api/students" '{
  "firstName": "Test",
  "lastName": "Student",
  "grade": "3rd Grade",
  "dateOfBirth": "2015-05-15",
  "parentEmail": "parent@test.com",
  "parentPhone": "(555) 123-4567"
}'

# 4. Get all attendance records
echo -e "${GREEN}4. Get All Attendance Records${NC}"
test_endpoint GET "/api/attendance"

# 5. Get attendance for first student
echo -e "${GREEN}5. Get Student Attendance${NC}"
test_endpoint GET "/api/attendance/student/1"

# 6. Add attendance record
echo -e "${GREEN}6. Add Attendance Record${NC}"
test_endpoint POST "/api/attendance" '{
  "studentId": 1,
  "attendanceDate": "'$(date -u +%Y-%m-%d)'",
  "status": "Present",
  "notes": "Test attendance record"
}'

# 7. Get all notes
echo -e "${GREEN}7. Get All Notes${NC}"
test_endpoint GET "/api/notes"

# 8. Add a note
echo -e "${GREEN}8. Add Note${NC}"
test_endpoint POST "/api/notes" '{
  "studentId": 1,
  "noteDate": "'$(date -u +%Y-%m-%d)'",
  "category": "Academic",
  "content": "Student showing good progress in math"
}'

# 9. Swagger/OpenAPI
echo -e "${GREEN}9. Swagger Documentation${NC}"
echo "Visit: $BASE_URL/swagger"
echo ""

echo -e "${GREEN}=== Tests Complete ===${NC}"
