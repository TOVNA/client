import { useMutation } from "@tanstack/react-query";
import { useRefetchQueries } from "../queries/useRefetchQueries";
import { createClassSubject, deleteClassSubject, updateClassSubject } from "../../api/classSubject";

export const useClassSubjectMutations = () => {
  const { refetchClassSubjects } = useRefetchQueries();

  const createClassSubjectMutation = useMutation(createClassSubject, {
    onSuccess: () => {
      refetchClassSubjects();
    },
  });

  const updateClassSubjectMutation = useMutation(updateClassSubject, {
    onSuccess: () => {
      refetchClassSubjects();
    },
  });

  const deleteClassSubjectMutation = useMutation(deleteClassSubject, {
    onSuccess: () => {
      refetchClassSubjects();
    },
  });

  return { createClassSubjectMutation, updateClassSubjectMutation, deleteClassSubjectMutation };
};
