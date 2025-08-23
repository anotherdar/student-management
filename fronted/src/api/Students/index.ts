import type { Grade, Student } from "@/types";


const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://0.0.0.0:8000/v1/students';

const getStudents = async () => {
    try {
        const response = await fetch(BASE_URL, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Error al obtener los estudiantes');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error al obtener los estudiantes');
    }
}

const createStudent = async (student: Omit<Student, 'id' | 'gradeAverage'>) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify(student),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Error al crear el estudiante');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error al crear el estudiante');
    }
}

const updateGrades = async (id: string, grades: Grade[]) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}/grades`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ grades }),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar las notas');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error al actualizar las notas');
    }
}

const deleteStudent = async (id: string) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el estudiante');
        }
    } catch (error) {
        throw new Error('Error al eliminar el estudiante');
    }
}

export const studentsApi = {
    students: {
        get: getStudents,
        create: createStudent,
        delete: deleteStudent,
    },
    grades: {
        update: updateGrades,
    }
}