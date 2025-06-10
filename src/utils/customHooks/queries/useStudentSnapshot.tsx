import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { StudentSnapshot } from "../../../types/entities/student";
import { getStudentSnapshot } from "../../api/student";

export const useStudentSnapshot = (studentId: string | undefined) => {
  return useQuery<StudentSnapshot[]>(
    [studentId && QUERY_KEYS.STUDNET_SNAPSHOT(studentId)],
    () => getStudentSnapshot(studentId)
  );
};
