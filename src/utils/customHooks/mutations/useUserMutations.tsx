import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../api/user";
import { register } from "../../api/auth";
import { useRefetchQueries } from "../queries/useRefetchQueries";

export const useUserMutations = () => {
  const { refetchUserById, refetchPosts, refetchPostsByUser } =
    useRefetchQueries();
  const updateUserMutation = useMutation(updateUser, {
    onSuccess: (data) => {
      refetchUserById(data._id);
      refetchPosts();
      refetchPostsByUser(data._id);
    },
  });

  const createUserMutation = useMutation(register, {
    onSuccess: (data) => {
      refetchUserById(data._id);
    },
  });

  return { updateUserMutation, createUserMutation };
};
