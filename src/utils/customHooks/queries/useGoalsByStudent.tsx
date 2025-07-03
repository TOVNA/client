import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { Goal } from "../../../types/entities/goal";
import { getGoalsByStudentId } from "../../api/goals";

export const useGoalsByStudent = (studentId: string | undefined) => {
  return useQuery<Goal[] | null>(
    [QUERY_KEYS.GOALS_BY_STUDENT_ID(studentId || "")],
    () => getGoalsByStudentId(studentId)
  );
};
