import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { getClassSubjectsByTeacher } from "../../api/teacher";
import { getAllClassSubjects } from "../../api/classSubject";
import { ClassSubject } from "../../../types/entities/classSubject";

export const useClassSubject = (teacherId?: string) => {
  return useQuery<ClassSubject[]>(
    [QUERY_KEYS.SUBJECT_CLASS, teacherId && QUERY_KEYS.SUBJECT_CLASS_BY_ID(teacherId)],
    () => (teacherId ? getClassSubjectsByTeacher(teacherId) : getAllClassSubjects()),
    {
      keepPreviousData: true,
    }
  );
};
