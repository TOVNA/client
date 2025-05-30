export interface Answer {
  questionId: string;
  questionnaireAnswerId: string;
  answerText?: string;
  answerNumeric?: number;
  answerOptions?: string[];
}
