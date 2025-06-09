import { Strategy } from "../../types/entities/strategy";
import { fetchRequest } from "../fetch";

export const getStrategiesByGoalId = async (goalId: string | undefined) => {
  if (goalId) {
    const strategies = await fetchRequest(`/strategies/goal/${goalId}`, {
      method: "GET",
    });

    return strategies;
  }

  return null;
};

export const creatStrategy = async (
  data: Pick<Strategy, "text" | "goalId">
) => {
  const strategy = await fetchRequest(`/strategies`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return strategy;
};

export const updateStrategy = async ({
  id,
  data,
}: {
  id: string;
  data: Pick<Strategy, "text">;
}) => {
  const strategy = await fetchRequest(`/strategies/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return strategy;
};

export const deleteStrategy = async (id: string) => {
  const deleteStrategy = await fetchRequest(`/strategies/${id}`, {
    method: "DELETE",
  });

  return deleteStrategy;
};
