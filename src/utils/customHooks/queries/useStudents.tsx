import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { getClassById } from "../../api/class";
import { Student } from "../../../types/entities/student";

export const useStudentsByClass = (classId: string | undefined) => {
  return useQuery<Student[]>(
    [classId && QUERY_KEYS.STUDENTS_BY_CLASS_ID(classId)],
    () => getClassById(classId),
    {
      keepPreviousData: true,
    }
  );
};
