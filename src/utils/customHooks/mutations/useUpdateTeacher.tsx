import { useMutation } from "@tanstack/react-query";
import { updateTeacher } from "../../api/teacher";
import { useRefetchQueries } from "../queries/useRefetchQueries";

export const useUpdateTeacher = () => {
  const { refetchTeachers } = useRefetchQueries();
  return useMutation(updateTeacher, {
    onSuccess: () => {
      refetchTeachers();
    },
  });
};
