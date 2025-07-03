export enum UserRole {
  ADMIN = "admin",
  HOMEROOM = "homeroom",
  TEACHER = "teacher",
}

export interface UserEntity {
  _id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  role: UserRole;
  image: string;
}

export interface UserData extends UserEntity {
  email: string;
  password: string;
}

export interface UserRegisterData extends Omit<UserEntity, "_id"> {
  email: string;
  password: string;
}
