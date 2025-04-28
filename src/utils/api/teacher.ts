import { Teacher } from "../../types/entities/teacher";
import { fetchRequest } from "../fetch";

export const getTeachers = async () => {
  const teachers = await fetchRequest("/teachers", {
    method: "GET",
  });

  return teachers;
};

export const getTeacherById = async (id: string) => {
  const teacher = await fetchRequest(`/teachers/${id}`, {
    method: "GET",
  });

  return teacher;
};

export type UpdateTeacher = Pick<
  Teacher["userId"],
  "first_name" | "last_name"
> &
  Pick<Teacher, "types">;
export const updateTeacher = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateTeacher;
}) => {
  const teacher = await fetchRequest(`/teachers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return teacher;
};
