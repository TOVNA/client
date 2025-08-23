import { fetchRequest } from "../fetch";

export const getQuestionnaireAnwerById = async (id: string | undefined) => {
  if (id) {
    const QuestionnaireAnwerById = await fetchRequest(
      `/questionnaire-answer/${id}`,
      {
        method: "GET",
      }
    );

    return QuestionnaireAnwerById;
  }

  return null;
};

export const getQuestionnaireAnswersByStudentId = async (
  studentId: string | undefined
) => {
  if (studentId) {
    const QuestionnaireAnswersByStudentId = await fetchRequest(
      `/questionnaire-answer/by-student/${studentId}`,
      {
        method: "GET",
      }
    );

    return QuestionnaireAnswersByStudentId;
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

export const getQuestionnaireAnswersByTeacherId = async (teacherId: string) => {
  if (teacherId) {
    return await fetchRequest(`/questionnaire-answer/by-teacher/${teacherId}`, {
      method: "GET",
    });
  }
  return null;
};