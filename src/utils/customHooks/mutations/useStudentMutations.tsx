import { useMutation } from "@tanstack/react-query";
import { useRefetchQueries } from "../queries/useRefetchQueries";
import {
  createStudent,
  deleteStduent,
  generateStudentSnapshot,
  updateStudent,
} from "../../api/student";

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

  const deleteStudentMutation = useMutation(deleteStduent, {
    onSuccess: () => {
      refetchStudents();
    },
  });

  const generateStudentSnapshotMutation = useMutation(generateStudentSnapshot);

  return {
    createStudentMutation,
    updateStudentMutation,
    deleteStudentMutation,
    generateStudentSnapshotMutation,
  };
};
