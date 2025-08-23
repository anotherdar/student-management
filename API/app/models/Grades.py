from pydantic import BaseModel

class Grades(BaseModel):
    name: str
    grade: float