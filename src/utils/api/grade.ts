import { fetchRequest } from "../fetch";

export const getGradesByStudentId = async (studentId: string | undefined) => {
  if (studentId) {
    const grades = await fetchRequest(
      `/dashboard/student/${studentId}/grades-over-time`,
      {
        method: "GET",
      }
    );

    return grades;
  }

  return null;
};

interface Grade {
  studentId: string;
  teacherId: string;
  classSubjectId: string;
  score: number;
  type: string;
  description: string | null;
}

export const createGrade = async (data: Grade) => {
  const grade = await fetchRequest(`/grade`, {
    method: "POST",
    body: JSON.stringify({ ...data, date: new Date() }),
  });

  return grade;
};
