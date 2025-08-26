import type { FC } from "react";
import { type Grade, type Student } from "../types";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";
import { DeleteStudentDialog } from "./DeleteStudentDialog";
import { EditGradesDialog } from "./EditGradesDialog";
import { ImFilesEmpty } from "react-icons/im";
import { PreviewStudentXml } from "./PreviewStudentXml";


type StudentTableProps = {
    students: Student[];
    onEditGrades: (id: string, grades: Grade[]) => void;
    onDelete: (student: Student) => void;
    isDeleting: boolean;
    isDeletingError: boolean;
    isUpdating: boolean;
    isUpdatingError: boolean;
}

export const StudentTable: FC<StudentTableProps> = ({ students, onEditGrades, onDelete, isDeleting, isUpdating, isUpdatingError }) => {
    if (!students.length) {
        return <div className='text-center h-screen container mx-auto p-2 py-4 flex-grow overflow-y-auto flex flex-col gap-4 items-center justify-center'>
            <ImFilesEmpty className='text-8xl text-blue-600' />
            <h1 className='text-2xl font-bold'>No hay estudiantes registrados</h1>
            <p className='text-sm text-muted-foreground text-center'>
                Por favor, añade un estudiante para empezar a registrar sus notas.
            </p>
        </div>
    }

    return (
        <div className="flex flex-col h-full relative">
            <Table className="w-full bg-white rounded-sm shadow-md border flex-grow border-gray-200 h-full">
                <TableHeader className="sticky top-0 bg-white z-10">
                    <TableRow>
                        <TableHead className="w-1/7">Nombre</TableHead>
                        <TableHead className="w-1/7">Apellido</TableHead>
                        <TableHead className="w-1/7">Nota 1</TableHead>
                        <TableHead className="w-1/7">Nota 2</TableHead>
                        <TableHead className="w-1/7">Nota 3</TableHead>
                        <TableHead className="w-1/7">Nota 4</TableHead>
                        <TableHead className="w-1/7">Promedio</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students.map((student) => (
                        <TableRow key={student.id} className="hover:bg-white">
                            <TableCell className="w-1/7 text-left border-r">{student.names}</TableCell>
                            <TableCell className="w-1/7 text-left border-r">{student.lastNames}</TableCell>
                            {Array.from({ length: 4 }, (_, index) => (
                                <TableCell key={`note-${index}`} className="w-1/7 text-left border-r">
                                    {student.grades[index] ? student.grades[index].grade : ''}
                                </TableCell>
                            ))}
                            <TableCell className="w-1/7 text-left border-r">{student.gradeAverage}</TableCell>
                            <TableCell className="w-1/7 text-left flex flex-row gap-2">
                                <EditGradesDialog student={student} onEdit={(grades) => onEditGrades(student.id, grades)} isLoading={isUpdating} isError={isUpdatingError} />
                                <DeleteStudentDialog student={student} onDelete={() => onDelete(student)} isLoading={isDeleting} />
                                <PreviewStudentXml student={student} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}