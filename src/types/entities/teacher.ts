import { UserEntity } from "./user";

export interface Teacher {
  _id: string;
  userId: UserEntity;
  types: TeacherType[];
}

export enum TeacherType {
  PROFESSION = "profession",
  HOMEROOM = "homeroom",
}
