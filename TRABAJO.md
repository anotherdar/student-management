### 📚 CAPÍTULO I: ESTRUCTURA DE DATOS TIPO ARREGLO VECTORIAL

#### **Explicación usando el código de la API:**

En tu API, los arreglos vectoriales se implementan de manera práctica en el archivo `main.py`:

```python
# db es un diccionario que actúa como arreglo vectorial
db: Dict[str, Student] = {}
```

**¿Por qué es un arreglo vectorial?**
- **Capacidad fija**: Aunque Python permite crecimiento dinámico, conceptualmente manejas un límite
- **Acceso por índice**: Usas `student_id` como clave para acceso directo
- **Almacenamiento secuencial**: Los estudiantes se almacenan en posiciones consecutivas

**Implementación en el API:**
```python
# En main.py - línea 23
@app.post("/v1/students", response_model=Student)
def create_student(student_data: StudentResponse):
    # Validación de capacidad (máximo 4 calificaciones)
    if len(grades) > 4:
        raise HTTPException(status_code=400, detail="You must provide 4 grades max")
    
    # Generación de ID único (posición en el arreglo)
    student_id = f"{names[:3]}_{lastNames[:3]}_{int(time.time())}_{datetime.now().strftime('%Y%m%d')}"
    
    # Inserción en el arreglo
    db[student_id] = student
```

**Operaciones de arreglo vectorial en el API:**
- **Inserción**: `db[student_id] = student` (O(1))
- **Búsqueda**: `db[student_id]` (O(1) - acceso directo)
- **Eliminación**: `del db[student_id]` (O(1))

**Código del API que implementa arreglos vectoriales:**
```python
# En main.py - Obtener todos los estudiantes (recorrer arreglo)
@app.get("/v1/students", response_model=List[Student])
def get_students():
    return list(db.values())  # Convertir arreglo a lista

# En main.py - Obtener estudiante específico (acceso por índice)
@app.get("/v1/students/{student_id}", response_model=Student)
def get_student(student_id: str):
    if student_id not in db:
        raise HTTPException(status_code=404, detail="Student not found")
    return db[student_id]  # Acceso directo al arreglo

# En main.py - Eliminar estudiante (eliminación del arreglo)
@app.delete("/v1/students/{student_id}")
def delete_student(student_id: str):
    if student_id not in db:
        raise HTTPException(status_code=404, detail="Student not found")
    del db[student_id]  # Eliminación del arreglo
    return Response(status_code=204)
```

---

### 📁 CAPÍTULO II: ESTRUCTURA DE DATOS TIPO ARCHIVO

#### **Explicación usando el código de la API:**

El API maneja archivos de manera implícita a través de la serialización JSON. Cuando envías datos, se convierten automáticamente a formato de archivo:

**Serialización automática a archivo JSON:**
```python
# En main.py - FastAPI convierte automáticamente a JSON
@app.get("/v1/students", response_model=List[Student])
def get_students():
    return list(db.values())  # Se serializa automáticamente a JSON
```

**Estructura de archivo en tu API:**
```python
# Los modelos Pydantic definen la estructura del archivo
class Student(BaseModel):
    id: str
    names: str
    lastNames: str
    grades: List[Grades] = Field(default_factory=list)
    gradeAverage: float = 0.0
```

**¿Cómo se convierte a archivo?**
1. **Datos en memoria**: `db: Dict[str, Student]`
2. **Serialización**: FastAPI convierte automáticamente a JSON
3. **Formato de archivo**: Estructura JSON bien formada
4. **Transmisión**: Se envía como archivo HTTP

**Ejemplo de archivo generado por la API:**
```json
[
  {
    "id": "jua_per_1234567890_20240115",
    "names": "Juan",
    "lastNames": "Pérez",
    "grades": [
      {"name": "Matemáticas", "grade": 85.0},
      {"name": "Programación", "grade": 90.0}
    ],
    "gradeAverage": 87.5
  }
]
```

**Código del API que implementa estructura de archivos:**
```python
# En models/Student.py - Define la estructura del archivo
class Student(BaseModel):
    id: str
    names: str
    lastNames: str
    grades: List[Grades] = Field(default_factory=list)
    gradeAverage: float = 0.0

    def calculate_grade_average(self):
        """Calculate the average grade of the student."""
        if not self.grades or len(self.grades) == 0:
            return 0.0
        return round(sum(grade.grade for grade in self.grades) / len(self.grades), 2)

# En models/Grades.py - Define la estructura de calificaciones
class Grades(BaseModel):
    name: str
    grade: float

# En main.py - Serialización automática a archivo
@app.post("/v1/students", response_model=Student)
def create_student(student_data: StudentResponse):
    # ... lógica de creación ...
    return student  # Se convierte automáticamente a archivo JSON
```

---

### 📄 CAPÍTULO III: DOCUMENTO BIEN FORMADO EN JSON

#### **Explicación usando el código de la API:**

El API genera automáticamente documentos JSON bien formados. Cada endpoint retorna JSON válido:

**1. Estructura JSON automática:**
```python
# En main.py - línea 23
@app.post("/v1/students", response_model=Student)
def create_student(student_data: StudentResponse):
    # ... lógica de creación ...
    return student  # FastAPI convierte automáticamente a JSON
```

**2. Validación de estructura con Pydantic:**
```python
# En models/Student.py - línea 7
class Student(BaseModel):
    id: str
    names: str
    lastNames: str
    grades: List[Grades] = Field(default_factory=list)
    gradeAverage: float = 0.0
```

**3. Generación automática de JSON bien formado:**
```python
# En models/Grades.py - línea 3
class Grades(BaseModel):
    name: str
    grade: float
```

**¿Por qué es "bien formado"?**
- **Validación automática**: Pydantic valida tipos de datos
- **Estructura consistente**: Todos los estudiantes siguen el mismo formato
- **Tipos correctos**: `str`, `float`, `List` están correctamente definidos
- **Serialización automática**: FastAPI convierte a JSON válido

**Ejemplo de JSON generado por tu API:**
```json
{
  "id": "jua_per_1234567890_20240115",
  "names": "Juan",
  "lastNames": "Pérez",
  "grades": [
    {"name": "Matemáticas", "grade": 85.0},
    {"name": "Programación", "grade": 90.0}
  ],
  "gradeAverage": 87.5
}
```

**Código real de tu API que garantiza JSON bien formado:**
```python
# En main.py - Validación automática de tipos
@app.post("/v1/students", response_model=Student)
def create_student(student_data: StudentResponse):
    # Pydantic valida automáticamente los tipos
    names = student_data.names      # Debe ser str
    lastNames = student_data.lastNames  # Debe ser str
    grades = student_data.grades    # Debe ser List[Grades]
    
    # Validación de longitud máxima
    if len(grades) > 4:
        raise HTTPException(status_code=400, detail="You must provide 4 grades max")

# En models/StudentResponse.py - Validación de entrada
class StudentResponse(BaseModel):
    names: str
    lastNames: str
    grades: List[Grades] = Field(default_factory=list)

# En models/GradesUpdate.py - Validación de actualización
class GradesUpdate(BaseModel):
    grades: List[Grades] = Field(default_factory=list)
```

---

## 📦 **Que utilizamos**

### **1. `fastapi`**
- **¿Qué es?** Un framework web moderno y rápido para construir APIs con Python
- **¿Para qué sirve?** Permite crear endpoints HTTP (GET, POST, PUT, DELETE) de manera sencilla
- **¿Por qué lo usas?** Es la base de tu API para gestionar estudiantes y calificaciones
- **Características principales:**
  - Generación automática de documentación (Swagger/OpenAPI)
  - Validación automática de datos
  - Serialización automática a JSON
  - Muy rápido y eficiente

### **2. `uvicorn`**
- **¿Qué es?** Un servidor ASGI (Asynchronous Server Gateway Interface) ligero y rápido
- **¿Para qué sirve?** Ejecuta tu aplicación FastAPI en producción
- **¿Por qué lo usas?** Es el servidor que "corre" tu API cuando la inicias
- **Características principales:**
  - Soporte para WebSockets
  - Recarga automática en desarrollo
  - Muy eficiente para APIs asíncronas
  - Comando típico: `uvicorn main:app --reload`

### **3. `pydantic`**
- **¿Qué es?** Una biblioteca para validación de datos y serialización usando anotaciones de tipo Python
- **¿Para qué sirve?** Define y valida la estructura de tus modelos de datos (Student, Grades)
- **¿Por qué lo usas?** Garantiza que los datos que entran y salen de tu API sean válidos
- **Características principales:**
  - Validación automática de tipos
  - Conversión automática de datos
  - Generación de esquemas JSON
  - Integración perfecta con FastAPI

## 🔄 **CÓMO FUNCIONAN JUNTOS EN TU API:**

```python
# fastapi - Define los endpoints
@app.post("/v1/students")
def create_student(student_data: StudentResponse):
    # pydantic - Valida automáticamente student_data
    # uvicorn - Sirve la API en el servidor
    return student
```

**Flujo de trabajo:**
1. **`uvicorn`** inicia el servidor
2. **`fastapi`** maneja las peticiones HTTP
3. **`pydantic`** valida y convierte los datos
4. **`fastapi`** retorna respuestas JSON automáticamente

Estos tres componentes son la base fundamental de la API de gestión de estudiantes y calificaciones.
