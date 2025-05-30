import { useMutation } from "@tanstack/react-query";
import { submitQuestionnaireAnswers } from "../../api/questionnaire";

export const useInsertQuestionnaire = () => {
  return useMutation(submitQuestionnaireAnswers);
};
