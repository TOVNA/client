import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { Grade } from "../../../types/entities/grade";
import { getGradesByStudentId } from "../../api/grade";

export const useStudentGradesByStudentId = (studentId: string | undefined) => {
  return useQuery<Grade[]>(
    [studentId && QUERY_KEYS.GRADES_BY_STUDENT_ID(studentId)],
    () => getGradesByStudentId(studentId)
  );
};
