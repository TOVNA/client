import { Class } from "./class";
import { Teacher } from "./teacher";

export interface ClassSubjectPayload {
  teacherId: string;
  classId: string;
  subject: string;
}

export interface ClassSubject {
  _id: string;
  teacherId: Teacher;
  classId: Class;
  subject: string;
}
