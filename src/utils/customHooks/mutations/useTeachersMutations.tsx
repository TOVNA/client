import { useMutation } from "@tanstack/react-query";
import { useRefetchQueries } from "../queries/useRefetchQueries";
import { createTeacher, deleteTeacher, updateTeacher } from "../../api/teacher";

export const useTeacherMutations = () => {
  const { refetchTeachers } = useRefetchQueries();

  const createTeacherMutation = useMutation(createTeacher, {
    onSuccess: () => {
      refetchTeachers();
    },
  });

  const updateTeacherMutation = useMutation(updateTeacher, {
    onSuccess: () => {
      refetchTeachers();
    },
  });

  const deleteTeacherMutation = useMutation(deleteTeacher, {
    onSuccess: () => {
      refetchTeachers();
    },
  });

  return {
    createTeacherMutation,
    updateTeacherMutation,
    deleteTeacherMutation,
  };
};
