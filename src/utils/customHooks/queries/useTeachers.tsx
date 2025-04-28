import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { Teacher } from "../../../types/entities/teacher";
import { getTeacherById, getTeachers } from "../../api/teacher";

export const useTeachers = (teacherId?: string) => {
  return useQuery<Teacher[] | Teacher>(
    [QUERY_KEYS.TEACHERS, teacherId && QUERY_KEYS.TEACHER_BY_ID(teacherId)],
    () => (teacherId ? getTeacherById(teacherId) : getTeachers()),
    {
      keepPreviousData: true,
    }
  );
};
