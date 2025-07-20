import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import {
  getAllClassSubjects,
  getClassSubjectById,
} from "../../api/classSubject";
import { ClassSubject } from "../../../types/entities/classSubject";

export const useClassSubjects = (classSubjectId?: string) => {
  return useQuery<ClassSubject[] | ClassSubject>(
    [
      QUERY_KEYS.CLASS_SUBJECTS,
      classSubjectId && QUERY_KEYS.CLASS_SUBJECT_BY_ID(classSubjectId),
    ],
    () =>
      classSubjectId
        ? getClassSubjectById(classSubjectId)
        : getAllClassSubjects(),
    {
      keepPreviousData: true,
    }
  );
};
