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
  STUDENT_BY_ID: (id: string) => `student-${id}`,
  TEACHERS: "teachers",
  TEACHER_BY_ID: (id: string) => `teacher-${id}`,
} as const;
