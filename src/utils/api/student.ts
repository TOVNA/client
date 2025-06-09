import { StudentInfo } from "../../types/entities/student";
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

export const getAllStudents = async () => {
  const students = await fetchRequest(`/students`, {
    method: "GET",
  });

  return students;
};

export const createStudent = async (data: StudentInfo) => {
  const teacher = await fetchRequest(`/students`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return teacher;
};

export const updateStudent = async ({
  id,
  data,
}: {
  id: string;
  data: StudentInfo;
}) => {
  const teacher = await fetchRequest(`/students/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return teacher;
};

export const deleteStduent = async (id: string) => {
  const deletedClass = await fetchRequest(`/students/${id}`, {
    method: "DELETE",
  });

  return deletedClass;
};

export const getStudentSnapshot = async (id: string | undefined) => {
  if (id) {
    const snapshot = await fetchRequest(`/status-snapshot/${id}`, {
      method: "GET",
    });

    return snapshot;
  }

  return null;
};

export const generateStudentSnapshot = async ({
  studentId,
  days,
}: {
  studentId: string;
  days: number;
}) => {
  const generatedSnapshot = await fetchRequest(`/status-snapshot/generate`, {
    method: "POST",
    body: JSON.stringify({ studentId, days }),
  });

  return generatedSnapshot;
};
