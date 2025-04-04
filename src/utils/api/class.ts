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
