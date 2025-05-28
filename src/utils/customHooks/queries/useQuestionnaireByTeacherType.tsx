import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { getQuestionnaireByTeacherType } from "../../api/questionnaire";
import { UserRole } from "../../../types/entities/user";
import { Questionnaire } from "../../../types/entities/questionnaire";

export const useQuestionnaireByTeacherType = (
  teacherType: UserRole.HOMEROOM | UserRole.TEACHER
) => {
  return useQuery<Questionnaire>(
    [teacherType && QUERY_KEYS.QUESTIONNAIRE_BY_TEACHER_TYPE(teacherType)],
    () => getQuestionnaireByTeacherType(teacherType),
    {
      keepPreviousData: true,
    }
  );
};
