import { fetchRequest } from "../fetch";

export const getSubjectClasses = async () => {
  const classes = await fetchRequest("/class-subjects", {
    method: "GET",
  });

  return classes;
};

export const getClassSubjectsByTeacher = async (teacherId: string) => {
  const classSubjects = await fetchRequest(`/class-subjects/teacher/${teacherId}`, {
    method: "GET",
  });

  return classSubjects;
};