import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { getQuestionnaireById } from "../../api/questionnaire";
import { Questionnaire } from "../../../types/entities/questionnaire";

export const useQuestionnaireById = (id?: string) => {
  return useQuery<Questionnaire>(
    [id && QUERY_KEYS.QUESTIONNAIRE_BY_ID(id)],
    () => getQuestionnaireById(id),
    {
      keepPreviousData: true,
      enabled: !!id,
    }
  );
};
