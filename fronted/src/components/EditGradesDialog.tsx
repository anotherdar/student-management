import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from './ui/dialog';
import { PiPencilLine } from 'react-icons/pi'
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { Grade, Student } from '@/types';
import { useLayoutEffect, useMemo, useState } from 'react';
import { ErrorAlert } from './ErrorAlert';

interface EditGradesDialogProps {
    student: Student;
    onEdit: (grades: Grade[]) => void;
    isLoading: boolean;
    isError: boolean;
}

const INPUTS = [
    {
        label: 'Nota 1',
        id: 'note1',
        type: 'number',
    },
    {
        label: 'Nota 2',
        id: 'note2',
        type: 'number',
    },
    {
        label: 'Nota 3',
        id: 'note3',
        type: 'number',
    },
    {
        label: 'Nota 4',
        id: 'note4',
        type: 'number',
    },
]

export const EditGradesDialog = ({ student, onEdit, isLoading, isError }: EditGradesDialogProps) => {
    const [grades, setGrades] = useState<Grade[]>([]);
    const [open, setOpen] = useState(false);

    const hasChanges = useMemo(() => {
        // If grades array is empty, check if any default grades have been filled
        if (grades.length === 0) {
            return false;
        }
        
        // Check if any grade differs from the student's existing grades
        return grades.some(grade => {
            const existingGrade = student.grades.find(g => g.name === grade.name);
            return !existingGrade || existingGrade.grade !== grade.grade;
        });
    }, [grades, student.grades]);

    useLayoutEffect(() => {
        // If student has no grades, initialize with default grade objects
        if (student.grades.length === 0) {
            const defaultGrades: Grade[] = INPUTS.map(input => ({
                name: input.id,
                grade: 0
            }));
            setGrades(defaultGrades);
        } else {
            setGrades(student.grades);
        }
    }, [student.grades]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const numericValue = Number(value);
        
        setGrades(prevGrades => {
            const existingGradeIndex = prevGrades.findIndex(grade => grade.name === id);
            
            if (existingGradeIndex !== -1) {
                // Update existing grade
                return prevGrades.map(grade => 
                    grade.name === id ? { ...grade, grade: numericValue } : grade
                );
            } else {
                // Create new grade
                const newGrade: Grade = { name: id, grade: numericValue };
                return [...prevGrades, newGrade];
            }
        });
    }

    const handleSubmit = async () => {
        // Filter out grades with value 0 (empty/default grades) before submitting
        const gradesToSubmit = grades.filter(grade => grade.grade > 0);
        await onEdit(gradesToSubmit);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <PiPencilLine size={24} className="text-blue-600" />
                </Button>
            </DialogTrigger>
            <div>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Editar notas de {student.names} {student.lastNames}</DialogTitle>
                        <DialogDescription>
                            Aquí puedes editar las notas de {student.names} {student.lastNames}.
                        </DialogDescription>
                    </DialogHeader>
                    {isError && <ErrorAlert title="Error al editar las notas" description="Por favor, verifica que los datos ingresados sean correctos y vuelve a intentarlo." />}

                    <div className="grid gap-4">
                        {INPUTS.map((input) => (
                            <div className="grid gap-3" key={input.id}>
                                <Label htmlFor={input.id}>{input.label}</Label>
                                <Input 
                                    id={input.id} 
                                    name={input.id} 
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={grades.find(grade => grade.name === input.id)?.grade || ''} 
                                    onChange={handleChange} 
                                />
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading || !hasChanges} onClick={handleSubmit}>Guardar cambios</Button>
                    </DialogFooter>
                </DialogContent>
            </div>
        </Dialog>
    )
}
