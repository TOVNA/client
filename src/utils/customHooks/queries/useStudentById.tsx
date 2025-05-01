import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { getStudentById } from "../../api/student";
import { Student } from "../../../types/entities/student";

export const useStudentById = (studentId: string | undefined) => {
  return useQuery<Student | undefined>(
    [QUERY_KEYS.STUDENT_BY_ID(studentId || "")],
    () => getStudentById(studentId)
  );
};
