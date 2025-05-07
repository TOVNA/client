import { Class, ClassPayload } from "../../types/entities/class";
import { fetchRequest } from "../fetch";

export const getClassById = async (id: string | undefined) => {
  if (id) {
    const classById = await fetchRequest(`/school-class/${id}`, {
      method: "GET",
    });

    return classById;
  }

  return null;
};

export const getClasses = async () => {
  const classes = await fetchRequest("/school-class", {
    method: "GET",
  });

  return classes;
};

export const createClass = async (data: ClassPayload) => {
  const createdClass = await fetchRequest(`/classes`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return createdClass;
};

export const updateClass = async ({
  id,
  data,
}: {
  id: string;
  data: ClassPayload;
}) => {
  const updatedClass = await fetchRequest(`/classes/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return updatedClass;
};
