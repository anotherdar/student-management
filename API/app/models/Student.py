from .Grades import Grades
from pydantic import BaseModel, Field
from typing import List


class Student(BaseModel):
    id: str
    names: str
    lastNames: str
    # grades is a list of Grades objects
    grades: List[Grades] = Field(default_factory=list)
    gradeAverage: float = 0.0

    def calculate_grade_average(self):
        """
        Calculate the average grade of the student.
        """
        # If the student has no grades, return 0.0
        if not self.grades or len(self.grades) == 0:
            return 0.0
        # Calculate the average grade of the student lets make sure we send just 2 decimal places
        return round(sum(grade.grade for grade in self.grades) / len(self.grades), 2)
    
    def update_grade_average(self):
        """
        Update the grade average when grades change.
        """
        self.gradeAverage = self.calculate_grade_average()
    
    def __init__(self, **data):
        super().__init__(**data)
        self.gradeAverage = self.calculate_grade_average()

class StudentResponse(BaseModel):
    names: str
    lastNames: str
    grades: List[Grades] = Field(default_factory=list)

class GradesUpdate(BaseModel):
    grades: List[Grades] = Field(default_factory=list)