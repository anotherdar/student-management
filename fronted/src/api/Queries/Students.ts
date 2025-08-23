import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { studentsApi } from "../Students";
import type { Grade } from "@/types";
import { toast } from "sonner"


const useGetStudents = (obj?: object) => {
    return useQuery({
        queryKey: ['students'],
        queryFn: () => studentsApi.students.get().then((res) => {
            console.log(res);
            return res;
        }),
        ...obj,
    });
}

const useCreateStudent = (obj?: object) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: studentsApi.students.create,
        onSuccess: () => {
            toast.success('Estudiante creado correctamente');
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
        onError: () => {
            toast.error('Error al crear el estudiante');
        },
        ...obj
    });
}

const useUpdateGrades = (obj?: object) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { id: string, grades: Grade[] }) => studentsApi.grades.update(data.id, data.grades),
        onSuccess: () => {
            toast.success('Notas actualizadas correctamente');
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
        onError: () => {
            toast.error('Error al actualizar las notas');
        },
        ...obj
    });
}

const useDeleteStudent = (obj?: object) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => studentsApi.students.delete(id),
        onSuccess: () => {
            toast.success('Estudiante eliminado correctamente');
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
        onError: () => {
            toast.error('Error al eliminar el estudiante');
        },
        ...obj
    });
}

export { useGetStudents, useCreateStudent, useUpdateGrades, useDeleteStudent };