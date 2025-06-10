import { useMutation } from "@tanstack/react-query";
import {
  creatStrategy,
  deleteStrategy,
  updateStrategy,
} from "../../api/strategies";

export const useStrategyMutations = () => {
  const createStrategyMutation = useMutation(creatStrategy, {});

  const updateStrategyMutation = useMutation(updateStrategy, {});

  const deleteStrategyMutation = useMutation(deleteStrategy);

  return {
    createStrategyMutation,
    updateStrategyMutation,
    deleteStrategyMutation,
  };
};
