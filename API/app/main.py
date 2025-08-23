from app.models import Grades, Student, StudentResponse, GradesUpdate
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
import time
from datetime import datetime

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# db is a dictionary of students
db: Dict[str, Student] = {}

@app.get("/v1/students", response_model=List[Student])
def get_students():
    return list(db.values())

# Endpoint para crear un estudiante
@app.post("/v1/students", response_model=Student)
def create_student(student_data: StudentResponse):
    # Extract data from the Pydantic model
    names = student_data.names
    lastNames = student_data.lastNames
    grades = student_data.grades
    
    # Validate required fields
    if not names or not lastNames:
        raise HTTPException(status_code=400, detail="Names and lastNames are required")
    
    # id based on the name and last name with a timestamp number and the current date
    student_id = f"{names[:3]}_{lastNames[:3]}_{int(time.time())}_{datetime.now().strftime('%Y%m%d')}"
    
    # Check if student already exists
    if student_id in db:
        raise HTTPException(status_code=400, detail="Student already exists")

    # only allow 4 grades
    if len(grades) > 4:
        raise HTTPException(status_code=400, detail="You must provide 4 grades max")
    
    # Create student with the generated ID
    student = Student(
        id=student_id,
        names=names,
        lastNames=lastNames,
        grades=grades
    )
    
    db[student_id] = student
    return student

@app.get("/v1/students/{student_id}", response_model=Student)
def get_student(student_id: str):
    if student_id not in db:
        raise HTTPException(status_code=404, detail="Student not found")
    return db[student_id]

# Endpoint para actualizar las calificaciones y el promedio
@app.put("/v1/students/{student_id}/grades", response_model=Student)
def update_student_grades(student_id: str, grades_data: GradesUpdate):
    if student_id not in db:
        raise HTTPException(status_code=404, detail="Student not found")
    
    grades = grades_data.grades
    
    # Validate that we have at most 4 grades
    if len(grades) > 4:
        raise HTTPException(status_code=400, detail="You must provide 4 grades max")
    
    student = db[student_id]
    student.grades = grades
    student.update_grade_average()
    db[student_id] = student
    return student

# Endpoint para eliminar un estudiante
@app.delete("/v1/students/{student_id}")
def delete_student(student_id: str):
    if student_id not in db:
        raise HTTPException(status_code=404, detail="Student not found")
    del db[student_id]
    return Response(status_code=204)

@app.get("/v1/health")
def root():
    return {"message": "Student Management API", "version": "1.0.0"}

