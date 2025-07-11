import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import {
  getQuestionnaireAnswersByStudentId,
  getQuestionnaireAnwerById,
} from "../../api/questionnaireAnwer";
import { QuestionnaireAnswer } from "../../../types/entities/questionnaireAnswer";

export const useQuestionnaireAnswersByStudent = (studentId?: string) => {
  return useQuery<QuestionnaireAnswer[]>(
    [studentId && QUERY_KEYS.QUESTIONNAIRE_ANSWERS_BY_STUDENT_ID(studentId)],
    () => getQuestionnaireAnswersByStudentId(studentId),
    {
      keepPreviousData: true,
    }
  );
};
export const useQuestionnaireAnswerById = (id?: string) => {
  return useQuery<QuestionnaireAnswer>(
    [id && QUERY_KEYS.QUESTIONNAIRE_ANSWERS_BY_QUESTIONNAIRE_ID(id)],
    () => getQuestionnaireAnwerById(id),
    {
      keepPreviousData: true,
    }
  );
};
