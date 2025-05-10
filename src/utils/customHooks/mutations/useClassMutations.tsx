import { useMutation } from "@tanstack/react-query";
import { useRefetchQueries } from "../queries/useRefetchQueries";
import { createClass, deleteClass, updateClass } from "../../api/class";

export const useClassMutations = () => {
  const { refetchClasses, refetchStudents } = useRefetchQueries();

  const createClassMutation = useMutation(createClass, {
    onSuccess: () => {
      refetchClasses();
      refetchStudents();
    },
  });

  const updateClassMutation = useMutation(updateClass, {
    onSuccess: () => {
      refetchClasses();
      refetchStudents();
    },
  });

  const deleteClassMutation = useMutation(deleteClass, {
    onSuccess: () => {
      refetchClasses();
      refetchStudents();
    },
  });

  return { createClassMutation, updateClassMutation, deleteClassMutation };
};
