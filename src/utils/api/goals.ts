import { Goal } from "../../types/entities/goal";
import { fetchRequest } from "../fetch";

export const getGoalsByStudentId = async (studentId: string | undefined) => {
  if (studentId) {
    const goals = await fetchRequest(`/goals/student/${studentId}`, {
      method: "GET",
    });

    return goals;
  }

  return null;
};

export const getGoalById = async (id: string | undefined) => {
  if (id) {
    const goal = await fetchRequest(`/goals/${id}`, {
      method: "GET",
    });

    return goal;
  }

  return null;
};

export const createGoal = async (data: Pick<Goal, "text" | "studentId">) => {
  const goal = await fetchRequest(`/goals`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return goal;
};

export const updateGoal = async ({
  id,
  data,
}: {
  id: string;
  data: Pick<Goal, "text" | "studentId">;
}) => {
  const goal = await fetchRequest(`/goals/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return goal;
};

export const deleteGoal = async (id: string) => {
  const deletedGoal = await fetchRequest(`/goals/${id}`, {
    method: "DELETE",
  });

  return deletedGoal;
};

export const generateStudentGoals = async ({
  studentId,
  days,
}: {
  studentId: string;
  days: number;
}) => {
  const generatedGoals = await fetchRequest(`/goals/generate`, {
    method: "POST",
    body: JSON.stringify({ studentId, days }),
  });

  return generatedGoals;
};
