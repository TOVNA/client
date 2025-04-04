import { Class } from "../../types/entities/class";
import { fetchRequest } from "../fetch";

export const getClassById = async (id: string | undefined) => {
  if (id) {
    const classById = await fetchRequest(`/api/schoolClass/${id}`, {
      method: "GET",
    });

    return classById;
  }

  return null;
};

export const getClasses = async () => {
  const classes = await fetchRequest("/api/schoolClass", {
    method: "GET",
  });

  return classes;
};
