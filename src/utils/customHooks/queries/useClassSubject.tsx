import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { getClassSubjectsByTeacher } from "../../api/teacher";
import { getAllClassSubjects } from "../../api/classSubject";
import { ClassSubject } from "../../../types/entities/classSubject";

export const useClassSubject = (classId?: string) => {
  return useQuery<ClassSubject[]>(
    [QUERY_KEYS.SUBJECT_CLASS, classId && QUERY_KEYS.SUBJECT_CLASS_BY_ID(classId)],
    () => (classId ? getClassSubjectsByTeacher(classId) : getAllClassSubjects()),
    {
      keepPreviousData: true,
    }
  );
};
