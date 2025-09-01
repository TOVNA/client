import { useQuery } from "@tanstack/react-query";
import { getTeacherById } from "../../api/teacher";
import { fetchRequest } from "../../fetch";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { QuestionnaireAnswer } from "../../../types/entities/questionnaireAnswer";
import { Teacher } from "../../../types/entities/teacher";
import { useClassSubject } from "./useClassSubject";
import { ClassSubject } from "../../../types/entities/classSubject";
import { useHomeroomClasses } from "./useHomeroomClasses";
import { useAuth } from "../../../components/AuthContext";
import { AxiosError } from "axios";

export function useTeacherData(teacherId: string) {
  const teacherQuery = useQuery<Teacher>({
    queryKey: [QUERY_KEYS.TEACHER_BY_ID(teacherId)],
    queryFn: () => getTeacherById(teacherId),
    enabled: !!teacherId,
  });
  const { user } = useAuth();

  const questionnairesQuery = useQuery<QuestionnaireAnswer[]>({
    queryKey: [QUERY_KEYS.QUESTIONNAIRES_BY_TEACHER(teacherId)],
    queryFn: () =>
      fetchRequest(`/questionnaire-answer/by-teacher/${teacherId}`, {
        method: "GET",
      }),
    enabled: !!teacherId,
  });

  const { data: classesData = [], isLoading: isLoadingClasses, error: classesError } = useHomeroomClasses(user?._id);
  const { data: classSubjectsData = [], isLoading: isLoadingClassSubjects, error: classSubjectsError } = useClassSubject(teacherId);
  const classesByTeacher = classesData?.map((classItem) => ({ _id: classItem?._id, classType: "מחנך", subject: classItem?.grade }));
  const classesBySubject = (classSubjectsData as ClassSubject[])?.map((classSubject) => ({ _id: classSubject?._id, classType: "מקצועי", subject: classSubject?.subject }));

  return {
    teacher: teacherQuery.data,
    teacherError: teacherQuery.error,
    questionnaires: questionnairesQuery.data || [],
    questionnairesError: (questionnairesQuery?.error as AxiosError)?.status === 404 ? false : questionnairesQuery.error,
    classes: [...classesByTeacher, ...classesBySubject],
    classesError,
    loading:
      teacherQuery.isLoading ||
      questionnairesQuery.isLoading ||
      isLoadingClasses ||
      isLoadingClassSubjects,
    classSubjectsError,
  };
}
