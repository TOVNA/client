import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { Teacher } from "../../../types/entities/teacher";
import { getTeacherById } from "../../api/teacher";

export const useTeacherById = (teacherId: string = "") => {
  return useQuery<Teacher | undefined>(
    [QUERY_KEYS.TEACHER_BY_ID(teacherId)],
    () => getTeacherById(teacherId),
    {
      keepPreviousData: true,
    }
  );
};
