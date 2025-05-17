import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { useSelectedStudentId } from "../../../components/SelectedStudentContext/SelectedStudentContext";
import { getStudentById } from "../../api/student";
import { Student } from "../../../types/entities/student";

export const useSelectedStudent = (id?: string) => {
  const { selectedStudentId } = useSelectedStudentId();
  const studentId = id || selectedStudentId;

  return useQuery<Student | undefined>(
    [QUERY_KEYS.STUDENT_BY_ID(studentId || "")],
    () => getStudentById(studentId),
    { keepPreviousData: true }
  );
};
