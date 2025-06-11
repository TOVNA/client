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
