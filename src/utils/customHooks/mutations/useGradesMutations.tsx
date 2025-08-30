import { useMutation } from "@tanstack/react-query";
import { useRefetchQueries } from "../queries/useRefetchQueries";
import { createGrade } from "../../api/grade";

export const useGradeMutations = (stuentId: string) => {
  const { refetchStudentGrades } = useRefetchQueries();

  const createGradeMutation = useMutation(createGrade, {
    onSuccess: () => {
      refetchStudentGrades(stuentId);
    },
  });

  return {
    createGradeMutation,
  };
};
