import { useQuery } from "@tanstack/react-query";
import { getTeacherById } from "../../api/teacher";
import { fetchRequest } from "../../fetch";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { useClasses } from "./useClasses";
import { Class } from "../../../types/entities/class";
import { QuestionnaireAnswer } from "../../../types/entities/questionnaireAnswer";
import { Teacher } from "../../../types/entities/teacher";
import { useClassSubject } from "./useClassSubject";
import { ClassSubject } from "../../../types/entities/classSubject";

export function useTeacherData(teacherId: string) {
  const teacherQuery = useQuery<Teacher>({
    queryKey: [QUERY_KEYS.TEACHER_BY_ID(teacherId)],
    queryFn: () => getTeacherById(teacherId),
    enabled: !!teacherId,
  });

  const questionnairesQuery = useQuery<QuestionnaireAnswer[]>({
    queryKey: [QUERY_KEYS.QUESTIONNAIRES_BY_TEACHER(teacherId)],
    queryFn: () =>
      fetchRequest(`/questionnaire-answer/by-teacher/${teacherId}`, {
        method: "GET",
      }),
    enabled: !!teacherId,
  });

  const { data: classesData = [], isLoading: isLoadingClasses, error: classesError } = useClasses();
  const {data: classSubjectsData = [], isLoading: isLoadingClassSubjects, error: classSubjectsError} = useClassSubject(teacherId);
  const classesByTeacher = (classesData as Class[])?.filter((classItem) => classItem.homeroomTeacherId._id === teacherId).map((classItem) => ({_id: classItem._id, classType: "מחנך", subject: '-'}));
  const classesBySubject = (classSubjectsData as ClassSubject[])?.map((classSubject) => ({_id: classSubject._id, classType: "מקצועי", subject: classSubject.subject}));

  return {
    teacher: teacherQuery.data,
    questionnaires: questionnairesQuery.data || [],
    classes: [...classesByTeacher, ...classesBySubject],
    loading:
      teacherQuery.isLoading ||
      questionnairesQuery.isLoading ||
      isLoadingClasses ||
      isLoadingClassSubjects,
    error:
      teacherQuery.error ||
      questionnairesQuery.error ||
      classesError ||
      classSubjectsError
  };
}
