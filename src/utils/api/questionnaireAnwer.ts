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

export const getQuestionById = async (id: string | undefined) => {
  if (id) {
    const QuestionById = await fetchRequest(`/questions/${id}`, {
      method: "GET",
    });

    return QuestionById;
  }

  return null;
};
