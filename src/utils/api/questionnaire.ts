import { fetchRequest } from "../fetch";
import { UserRole } from "../../types/entities/user";
import { Answer } from "../../types/entities/answer";

export const getQuestionnaireByTeacherType = async (
  teacherType: UserRole.HOMEROOM | UserRole.TEACHER
) => {
  if (teacherType) {
    const questionnaire = await fetchRequest(
      `/questionnaire/target/${teacherType}`,
      {
        method: "GET",
      }
    );

    return questionnaire[0];
  }

  return null;
};

interface QuestionnaireAnswers {
  answers: Answer[];
  questionnaireId: string;
  studentId: string;
  teacherId: string;
}

export const submitQuestionnaireAnswers = async (
  data: QuestionnaireAnswers
) => {
  const response = await fetchRequest(`/questionnaire-answer`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response;
};
