import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import type { Student } from "@/types";
import { type FC, useState, useMemo } from "react";
import { ErrorAlert } from "./ErrorAlert";


enum InputType {
    TEXT = 'text',
    NUMBER = 'number',
}
enum InputId {
    NAMES = 'names',
    LAST_NAMES = 'lastNames',
    NOTE_1 = 'note1',
    NOTE_2 = 'note2',
    NOTE_3 = 'note3',
    NOTE_4 = 'note4',
}

const INPUTS = [
    {
        label: 'Nombres',
        id: InputId.NAMES,
        defaultValue: '',
        type: InputType.TEXT,
        required: true
    },
    {
        label: 'Apellidos',
        id: InputId.LAST_NAMES,
        defaultValue: '',
        type: InputType.TEXT,
        required: true
    },
    {
        label: 'Nota 1',
        id: InputId.NOTE_1,
        defaultValue: '',
        type: InputType.NUMBER
    },
    {
        label: 'Nota 2',
        id: InputId.NOTE_2,
        defaultValue: '',
        type: InputType.NUMBER
    },
    {
        label: 'Nota 3',
        id: InputId.NOTE_3,
        defaultValue: '',
        type: InputType.NUMBER
    },
    {
        label: 'Nota 4',
        id: InputId.NOTE_4,
        defaultValue: '',
        type: InputType.NUMBER
    }
]

type AddStudentSheetProps = {
    onSubmit: (student: Omit<Student, 'id' | 'gradeAverage'>) => Promise<void>;
    isPending: boolean;
    isError: boolean;
}

export const AddStudentSheet: FC<AddStudentSheetProps> = ({ onSubmit, isPending, isError }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [student, setStudent] = useState<Omit<Student, 'id' | 'gradeAverage'>>({
        names: '',
        lastNames: '',
        grades: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const newStudent = { ...student };
        
        // Handle grade updates
        if ([InputId.NOTE_1, InputId.NOTE_2, InputId.NOTE_3, InputId.NOTE_4].includes(id as InputId)) {
            const existingGradeIndex = newStudent.grades.findIndex(grade => grade.name === id);
            
            if (existingGradeIndex !== -1) {
                // Update existing grade
                newStudent.grades[existingGradeIndex].grade = Number(value);
            } else {
                // Add new grade if it doesn't exist
                newStudent.grades.push({ name: id, grade: Number(value) });
            }
        }

        // Handle names and last names
        if (id === InputId.NAMES) {
            newStudent.names = value;
        }

        if (id === InputId.LAST_NAMES) {
            newStudent.lastNames = value;
        }

        setStudent(newStudent);
    }

    const handleSubmit = async () => {
        await onSubmit(student);
        setIsOpen(false);
    }

    const isDisabled = useMemo(() => {
        return [isPending, !student.names, !student.lastNames, student.grades.some(grade => !grade.grade)].some(Boolean);
    }, [isPending, student.names, student.lastNames, student.grades]);

  

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white active:bg-blue-800 active:text-white">Agregar estudiante</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Agregar estudiante</SheetTitle>
          <SheetDescription>
            Agrega un nuevo estudiante a la lista.
          </SheetDescription>
        </SheetHeader>
        {isError && <ErrorAlert title="Error al crear el estudiante" description="Por favor, verifica que los datos ingresados sean correctos y vuelve a intentarlo." />}
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          {/* Names Section */}
          <div className="grid gap-3">
            <Label htmlFor={InputId.NAMES}>Nombres</Label>
            <Input
              id={InputId.NAMES}
              defaultValue=""
              type={InputType.TEXT}
              required={true}
              onChange={handleChange}
              value={student.names}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor={InputId.LAST_NAMES}>Apellidos</Label>
            <Input
              id={InputId.LAST_NAMES}
              defaultValue=""
              type={InputType.TEXT}
              required={true}
              onChange={handleChange}
              value={student.lastNames}
            />
          </div>
          
          {/* Notes Section */}
          <div className="grid gap-3">
            <h3 className="text-md font-bold text-gray-600 mb-2">Notas del estudiante</h3>
          </div>
          
          {INPUTS.slice(2).map((input) => (
            <div className="grid gap-3" key={input.id}>
              <Label htmlFor={input.id}>{input.label}</Label>
              <Input
                id={input.id}
                defaultValue={input.defaultValue}
                type={input.type}
                required={input.required}
                onChange={handleChange}
                value={student[input.id as keyof typeof student] as string}
                min={0}
                max={100}
              />
            </div>
          ))}
        </div>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isDisabled}>Guardar</Button>
          <SheetClose asChild>
            <Button variant="outline">Cancelar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
