import { Class } from "./class";

export interface StudentInfo {
  first_name: string;
  last_name: string;
  birth_date: Date;
  class_id: string | null;
}

export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  class_id?: Class;
  created_at: Date;
}
