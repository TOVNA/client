import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { getStrategiesByGoalId } from "../../api/strategies";
import { Strategy } from "../../../types/entities/strategy";

export const useStrategiesByGoal = (goalId: string | undefined) => {
  return useQuery<Strategy[] | null>(
    [QUERY_KEYS.STRATEGIES_BY_GOAL_ID(goalId || "")],
    () => getStrategiesByGoalId(goalId)
  );
};
