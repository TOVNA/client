import { useMutation } from "@tanstack/react-query";
import { useRefetchQueries } from "../queries/useRefetchQueries";
import { createClass, updateClass } from "../../api/class";

export const useClassMutations = () => {
  const { refetchClasses } = useRefetchQueries();

  const createClassMutation = useMutation(createClass, {
    onSuccess: () => {
      refetchClasses();
    },
  });

  const updateClassMutation = useMutation(updateClass, {
    onSuccess: () => {
      refetchClasses();
    },
  });

  return { createClassMutation, updateClassMutation };
};
