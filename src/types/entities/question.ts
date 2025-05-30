export enum QuestionType {
  TEXT = "text",
  MULTIPLE_OPTIONS = "multiple-options",
}

export interface Question {
  _id: string;
  questionnaireId: string;
  text: string;
  description: string;
  type: QuestionType;
}
