import { UserRole } from "../types/entities/user";

export const QUERY_KEYS = {
  POSTS: "posts",
  COMMENTS: "comments",
  POSTS_BY_USER: (userId: string) => `posts-${userId}`,
  COMMENTS_BY_POST: (postId: string) => `comments-${postId}`,
  USER_BY_ID: (id: string) => `user-${id}`,
  CLASSES: "classes",
  CLASS_BY_ID: (id: string) => `class-${id}`,
  STUDENTS: "students",
  STUDENTS_BY_CLASS_ID: (id: string) => `students-${id}`,
  GOALS_BY_STUDENT_ID: (id: string) => `goals-student-${id}`,
  STUDNET_SNAPSHOT: (id: string) => `student-snapshot-${id}`,
  GOAL_BY_ID: (id: string) => `goal-${id}`,
  STRATEGIES_BY_GOAL_ID: (id: string) => `strategies-${id}`,
  STUDENT_BY_ID: (id: string) => `student-${id}`,
  TEACHERS: "teachers",
  TEACHER_BY_ID: (id: string) => `teacher-${id}`,
  QUESTIONNAIRE_BY_TEACHER_TYPE: (
    teacherType: UserRole.HOMEROOM | UserRole.TEACHER
  ) => `questionnaire-${teacherType}`,
} as const;
