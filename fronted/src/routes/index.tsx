import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import { StudentTable } from '@/components/StudentTable'
import { AddStudentSheet } from '@/components/StudentSheet'
import { useCreateStudent, useDeleteStudent, useGetStudents, useUpdateGrades } from '@/api/Queries/Students'
import { FaRegDizzy } from 'react-icons/fa'
import { CgSpinner } from 'react-icons/cg'


const ErrorComponent = () => {
  return <div className='flex flex-col h-screen'>
    <Header />
    <div className='text-center h-screen container mx-auto p-2 py-4 flex-grow overflow-y-auto flex flex-col gap-4 items-center justify-center'>
      <FaRegDizzy className='text-9xl text-red-500 animate-bounce' />
      <h1 className='text-2xl font-bold'>Error</h1>
      <p className='text-sm text-muted-foreground text-center'>
        Ocurrió un error al cargar los estudiantes.
      </p>
    </div>
  </div>
}


export const Route = createFileRoute('/')({
  component: App,
  errorComponent: ErrorComponent,
})

function App() {
  const { data: students, isPending } = useGetStudents();
  const { mutateAsync: createStudent, isPending: isCreating, isError: isCreatingError } = useCreateStudent();
  const { mutateAsync: updateGrades, isPending: isUpdating, isError: isUpdatingError } = useUpdateGrades();
  const { mutateAsync: deleteStudent, isPending: isDeleting, isError: isDeletingError } = useDeleteStudent();

  if (isPending) {
    return <div className='flex flex-col h-screen'>
      <Header />
      <div className='text-center h-screen container mx-auto p-2 py-4 flex-grow overflow-y-auto flex flex-col gap-4 items-center justify-center'>
        <CgSpinner className='text-9xl text-blue-500 animate-spin' />
        <h1 className='text-2xl font-bold'>Cargando...</h1>
        <p className='text-sm text-muted-foreground text-center'>
          Por favor, espere mientras se cargan los estudiantes.
        </p>
      </div>
    </div>
  }

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className="text-center container mx-auto p-2 py-4 flex-grow overflow-y-auto flex flex-col gap-4">
        {isPending ? <div>Loading...</div> : <>
          <div className="flex justify-end items-center">
            <AddStudentSheet onSubmit={createStudent} isPending={isCreating} isError={isCreatingError} />
          </div>
          <StudentTable
            students={students ?? []}
            onEditGrades={(id, grades) => updateGrades({ id, grades })}
            onDelete={(student) => deleteStudent(student.id)}
            isDeleting={isDeleting}
            isDeletingError={isDeletingError}
            isUpdating={isUpdating}
            isUpdatingError={isUpdatingError}
          />
        </>}
      </div>
    </div>
  )
}
