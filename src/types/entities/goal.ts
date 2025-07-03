export interface Goal {
  _id: string;
  studentId: string;
  generatedByAI: boolean;
  text: string;
  createdAt: Date;
}
