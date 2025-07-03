import { useMutation } from "@tanstack/react-query";
import {
  createGoal,
  deleteGoal,
  generateStudentGoals,
  updateGoal,
} from "../../api/goals";
import { useRefetchQueries } from "../queries/useRefetchQueries";

export const useGoalsMutations = () => {
  const { refetchGoalsByStudent } = useRefetchQueries();

  const createGoalMutation = useMutation(createGoal, {
    onSuccess: (data) => {
      if (data?.studentId) {
        refetchGoalsByStudent(data.studentId);
      }
    },
  });

  const updateGoalMutation = useMutation(updateGoal, {
    onSuccess: (data) => {
      if (data?.studentId) {
        refetchGoalsByStudent(data.studentId);
      }
    },
  });

  const deleteGoalMutation = useMutation(deleteGoal);

  const generateStudentGoalsMutation = useMutation(generateStudentGoals);

  return {
    createGoalMutation,
    updateGoalMutation,
    deleteGoalMutation,
    generateStudentGoalsMutation,
  };
};
