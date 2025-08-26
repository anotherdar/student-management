import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from './ui/dialog';
import { PiEye } from 'react-icons/pi'
import type { Student } from '@/types';
import { toXML } from 'jstoxml';
import { CodeBlock } from './XmlRender';

interface PreviewStudentXmlProps {
    student: Student;
}

export const PreviewStudentXml = ({ student }: PreviewStudentXmlProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <PiEye size={24} className="text-blue-600" />
                </Button>
            </DialogTrigger>
            <div>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Vista previa de {student.names} {student.lastNames}</DialogTitle>
                        <DialogDescription>
                            Aquí puedes ver la información del estudiante {student.names} {student.lastNames}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <CodeBlock code={toXML(student as any, { indent: ' ', header: true })} language="xml" />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cerrar</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </div>

        </Dialog>
    )
}
