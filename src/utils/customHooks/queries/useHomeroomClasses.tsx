import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { getHomeroomClassesByTeacher } from "../../api/teacher";
import { Class } from "../../../types/entities/class";

export const useHomeroomClasses = (teacherId: string = '') => {
  return useQuery<Class[]>(
    [QUERY_KEYS.HOMEROOM_CLASSES, teacherId && QUERY_KEYS.HOMEROOM_CLASSES_BY_TEACHER_ID(teacherId)],
    () => (getHomeroomClassesByTeacher(teacherId)),
    {
      keepPreviousData: true,
    }
  );
};
