import { fetchRequest } from "../fetch";

export const getQuestionnaireAnwerById = async (id: string | undefined) => {
  if (id) {
    const QuestionnaireAnwerById = await fetchRequest(`/questionnaire-answer/${id}`, {
      method: "GET",
    });

    return QuestionnaireAnwerById;
  }

  return null;
};
