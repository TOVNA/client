import { Student } from "../types/entities/student";

export const LOCAL_STORAGE_KEYS = {
  PROCESS_QUESTIONNAIRES_TIME_BY_STUDENT: (studentId: Student["_id"]) =>
    `processQuestionnairesTime-${studentId}`,
} as const;
