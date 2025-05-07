import { Class } from "./class";

export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  class?: Class;
  created_at: Date;
}
