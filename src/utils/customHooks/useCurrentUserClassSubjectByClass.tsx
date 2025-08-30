import { useAuth } from "../../components/AuthContext";
import { ClassSubject } from "../../types/entities/classSubject";
import { useClassSubjects } from "./queries/useClassSubjects";

export const useCurrentUserClassSubjectByClass = (classId: string | undefined) => {
  const { data: classSubjects } = useClassSubjects();
  const { user } = useAuth();

  const currentUserClassSubject = (classSubjects as ClassSubject[])
    ?.filter((classSubject) => classSubject?.classId?._id === classId)
    ?.filter((classSubject) => classSubject.teacherId.userId._id === user?._id)[0];

  return { currentUserClassSubject };
};
