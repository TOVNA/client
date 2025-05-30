import { Question } from "./question";
import { UserRole } from "./user";

export interface Questionnaire {
  _id: string;
  title: string;
  description: string;
  targetRole: UserRole.HOMEROOM | UserRole.TEACHER;
  questionIds: Question[];
}
