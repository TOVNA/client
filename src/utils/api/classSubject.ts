import { ClassSubjectPayload } from "../../types/entities/classSubject";
import { fetchRequest } from "../fetch";

export const getClassSubjectById = async (id: string | undefined) => {
  if (id) {
    const classSubjectById = await fetchRequest(`/class-subject/${id}`, {
      method: "GET",
    });

    return classSubjectById;
  }

  return null;
};

export const getAllClassSubjects = async () => {
  const classes = await fetchRequest("/class-subject", {
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

export const createClassSubject = async (data: ClassSubjectPayload) => {
  const createdClassSubject = await fetchRequest(`/class-subject`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return createdClassSubject;
};

export const updateClassSubject = async ({
  id,
  data,
}: {
  id: string;
  data: ClassSubjectPayload;
}) => {
  const updatedClassSubject = await fetchRequest(`/class-subject/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return updatedClassSubject;
};

export const deleteClassSubject = async ({ id }: { id: string }) => {
  const deletedClassSubject = await fetchRequest(`/class-subject/${id}`, {
    method: "DELETE",
  });

  return deletedClassSubject;
};
