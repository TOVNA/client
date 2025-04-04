import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { Class } from "../../../types/entities/class";
import { getClassById, getClasses } from "../../api/class";

export const useClasses = (classId?: string) => {
  return useQuery<Class[] | Class>(
    [QUERY_KEYS.CLASSES, classId && QUERY_KEYS.CLASS_BY_ID(classId)],
    () => (classId ? getClassById(classId) : getClasses()),
    {
      keepPreviousData: true,
    }
  );
};
