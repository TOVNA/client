export interface ClassSubject {
  _id: string;
  classId: {
    _id: string;
    grade: string;
    classNumber: number;
  };
  subject: string;
  teacherId: {
    _id: string;
  };
}