import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { UserEntity } from "../../../types/entities/user";
import { QUERY_KEYS } from "../../../constants/QueryKeys";
import { Student } from "../../../types/entities/student";
import { Goal } from "../../../types/entities/goal";

export const useRefetchQueries = () => {
  const queryClient = useQueryClient();

  const refetchQuery = (queryKey: QueryKey) =>
    queryClient.invalidateQueries(queryKey);

  const refetchUserById = (userId: UserEntity["_id"]) =>
    refetchQuery([QUERY_KEYS.USER_BY_ID(userId)]);
  const refetchPosts = () => refetchQuery([QUERY_KEYS.POSTS]);
  const refetchPostsByUser = (userId: UserEntity["_id"]) =>
    refetchQuery([QUERY_KEYS.POSTS_BY_USER(userId)]);
  const refetchTeachers = () => refetchQuery([QUERY_KEYS.TEACHERS]);
  const refetchStudents = () => refetchQuery([QUERY_KEYS.STUDENTS]);
  const refetchClasses = () => refetchQuery([QUERY_KEYS.CLASSES]);
  const refetchGoalsByStudent = (studentId: Student["_id"]) =>
    refetchQuery([QUERY_KEYS.GOALS_BY_STUDENT_ID(studentId)]);
  const refetchStrategiesByGoal = (goalId: Goal["_id"]) =>
    refetchQuery([QUERY_KEYS.STRATEGIES_BY_GOAL_ID(goalId)]);
  const refetchStudentSnapshot = (studentId: Student["_id"]) =>
    refetchQuery([QUERY_KEYS.STUDNET_SNAPSHOT(studentId)]);

  return {
    refetchUserById,
    refetchPosts,
    refetchPostsByUser,
    refetchTeachers,
    refetchStudents,
    refetchClasses,
    refetchGoalsByStudent,
    refetchStrategiesByGoal,
    refetchStudentSnapshot,
  };
};
