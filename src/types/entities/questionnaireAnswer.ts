import { Answer } from "./answer";
import { Questionnaire } from "./questionnaire";
import { Student } from "./student";
import { Teacher } from "./teacher";

export interface QuestionnaireAnswer {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  questionnaireId: Questionnaire;
  studentId: Student;
  teacherId: Teacher;
  answerIds: Answer[];
}
