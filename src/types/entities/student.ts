import { Class } from "./class";

export interface StudentInfo {
  first_name: string;
  last_name: string;
  birth_date: Date;
}

export interface Student extends StudentInfo {
  _id: string;
  class?: Class;
  created_at: Date;
}

export interface StudentGrade {
  _id: string;
  category: string;
  value: number;
}
export interface StudentSnapshot {
  summary: string;
  grades: StudentGrade[];
  createdAt: Date;
  updatedAt: Date;
}
