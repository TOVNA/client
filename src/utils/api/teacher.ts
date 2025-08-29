import { Teacher } from "../../types/entities/teacher";
import { UserData } from "../../types/entities/user";
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

export type CreateTeacher = {
  userId: Pick<Teacher["userId"], "first_name" | "last_name" | "role"> &
    Pick<UserData, "email">;
  types: Teacher["types"];
};
export const createTeacher = async (data: CreateTeacher) => {
  const teacher = await fetchRequest("/teachers", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return teacher;
};

export const deleteTeacher = async (id: string) => {
  const teacher = await fetchRequest(`/teachers/${id}`, {
    method: "DELETE",
  });

  return teacher;
};

export const getClassSubjectsByTeacher = async (teacherId: string) => {
  const classSubjects = await fetchRequest(`/class-subject/teacher/${teacherId}`, {
    method: "GET",
  });

  return classSubjects;
};

export const getHomeroomClassesByTeacher = async (teacherId: string) => {
  const homeroomClasses = await fetchRequest(`/school-class/homeroomTeacher/${teacherId}`, {
    method: "GET",
  });

  return homeroomClasses;
};
