import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { Teacher } from "../../../types/entities/teacher";
import { getTeachers } from "../../api/teacher";

export const useTeachers = () => {
  return useQuery<Teacher[]>([QUERY_KEYS.TEACHERS], () => getTeachers(), {
    keepPreviousData: true,
  });
};
