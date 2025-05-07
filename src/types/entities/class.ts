import { Student } from "./student";
import { UserEntity } from "./user";

export interface ClassPayload {
  grade: string;
  classNumber: number;
  homeroomTeacherId: string;
  studentIds: string[];
}

export interface Class {
  _id: string;
  grade: string;
  classNumber: number;
  homeroomTeacherId: UserEntity;
  studentIds: Student[];
}
