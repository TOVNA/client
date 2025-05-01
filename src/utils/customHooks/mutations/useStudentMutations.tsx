import { useMutation } from "@tanstack/react-query";
import { useRefetchQueries } from "../queries/useRefetchQueries";
import { createStudent, updateStudent } from "../../api/student";

export const useStudentMutations = () => {
  const { refetchStudents } = useRefetchQueries();

  const createStudentMutation = useMutation(createStudent, {
    onSuccess: () => {
      refetchStudents();
    },
  });

  const updateStudentMutation = useMutation(updateStudent, {
    onSuccess: () => {
      refetchStudents();
    },
  });

  return { createStudentMutation, updateStudentMutation };
};
