import { UserData, UserEntity } from "./user";

export interface Teacher {
  _id: string;
  userId: UserEntity & Pick<UserData, "email">;
  types: TeacherType[];
}

export enum TeacherType {
  PROFESSION = "profession",
  HOMEROOM = "homeroom",
}
