import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { Goal } from "../../../types/entities/goal";
import { getGoalById } from "../../api/goals";

export const useGoalById = (id: string | undefined) => {
  return useQuery<Goal | null>([QUERY_KEYS.GOAL_BY_ID(id || "")], () =>
    getGoalById(id)
  );
};
