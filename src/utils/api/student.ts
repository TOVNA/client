import { fetchRequest } from "../fetch";

export const getStudentById = async (id: string | undefined) => {
  if (id) {
    const studentById = await fetchRequest(`/students/${id}`, {
      method: "GET",
    });

    return studentById;
  }

  return null;
};
