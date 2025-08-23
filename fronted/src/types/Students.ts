import { type Grade } from "./Grades";

interface Student {
    names: string;
    lastNames: string;
    grades: Grade[];
    gradeAverage: number;
    id: string;
}

export type { Student };