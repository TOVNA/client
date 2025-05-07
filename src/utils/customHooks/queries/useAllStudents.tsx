import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { Student } from "../../../types/entities/student";
import { getAllStudents } from "../../api/student";

export const useAllStudents = () => {
  return useQuery<Student[]>([QUERY_KEYS.STUDENTS], () => getAllStudents(), {
    keepPreviousData: true,
  });
};
