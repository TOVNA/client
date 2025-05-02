import { UserEntity } from "../../types/entities/user";
import { fetchRequest } from "../fetch";

export const getUserById = async (id: string | undefined) => {
  if (id) {
    const user = await fetchRequest(`/user/${id}`, {
      method: "GET",
    });

    return user;
  }

  return null;
};

export const updateUser = async (user: UserEntity) => {
  const updatedUser = await fetchRequest(`/user`, {
    method: "PUT",
    body: JSON.stringify(user),
  });

  return updatedUser;
};

export const createUser = async (user: UserEntity) => {
  const newUser = await fetchRequest(`/user`, {
    method: "POST",
    body: JSON.stringify(user),
  });

  return newUser;
};
