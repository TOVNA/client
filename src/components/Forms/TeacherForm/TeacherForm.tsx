import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./TeacherForm.module.css";
import { useTeachers } from "../../../utils/customHooks/queries/useTeachers";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { TeacherType } from "../../../types/entities/teacher";
import { useUpdateTeacher } from "../../../utils/customHooks/mutations/useUpdateTeacher";

const schema = z.object({
  firstName: z.string().min(1, "שם פרטי הוא שדה חובה"),
  lastName: z.string().min(1, "שם משפחה הוא שדה חובה"),
  role: z
    .array(z.nativeEnum(TeacherType), { required_error: "תפקיד הוא שדה חובה" })
    .min(1, "יש לבחור לפחות תפקיד אחד"),
});

interface TeacherFormInputs {
  firstName: string;
  lastName: string;
  role: TeacherType[];
}

export const TeacherForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: teacherInfo, isLoading } = useTeachers(id || "");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TeacherFormInputs>({
    resolver: zodResolver(schema),
  });

  const { mutate: updateTeacher } = useUpdateTeacher();
  const onSubmit = (data: TeacherFormInputs) => {
    updateTeacher({
      id: id || "",
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        types: data.role,
      },
    });
  };

  useEffect(() => {
    if (teacherInfo) {
      reset({
        firstName: teacherInfo.userId.first_name,
        lastName: teacherInfo.userId.last_name,
        role: teacherInfo.types,
      });
    }
  }, [teacherInfo, reset]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.title}>עריכת מורה עם מזהה: {id}</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="firstName">שם פרטי</label>
          <input id="firstName" {...register("firstName")} />
          {errors.firstName && (
            <p className={styles.error}>{errors.firstName.message}</p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="lastName">שם משפחה</label>
          <input id="lastName" {...register("lastName")} />
          {errors.lastName && (
            <p className={styles.error}>{errors.lastName.message}</p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="role">תפקיד</label>
          <div className={styles.checkboxGroup}>
            {Object.values(TeacherType).map((type) => (
              <label key={type}>
                <input type="checkbox" value={type} {...register("role")} />
                {type}
              </label>
            ))}
            {errors.role && (
              <p className={styles.error}>{errors.role.message}</p>
            )}
          </div>
        </div>
        <button type="submit" className={styles.button}>
          שמירה
        </button>
      </form>
    </div>
  );
};
