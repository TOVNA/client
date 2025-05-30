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
