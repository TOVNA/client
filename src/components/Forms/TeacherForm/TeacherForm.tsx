import React, { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./TeacherForm.module.css";
import { useTeacherById } from "../../../utils/customHooks/queries/useTeacherById";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { TeacherType } from "../../../types/entities/teacher";
import { useTeacherMutations } from "../../../utils/customHooks/mutations/useTeachersMutations";
import { useUserMutations } from "../../../utils/customHooks/mutations/useUserMutations";
import { UserRole } from "../../../types/entities/user";

const schemaConfig = (id?: string) =>
  z.object({
    firstName: z.string().min(1, "שם פרטי הוא שדה חובה"),
    lastName: z.string().min(1, "שם משפחה הוא שדה חובה"),
    types: z
      .array(z.nativeEnum(TeacherType), {
        required_error: "תפקיד הוא שדה חובה",
      })
      .min(1, "יש לבחור לפחות תפקיד אחד"),
    role: z
      .nativeEnum(UserRole)
      .optional()
      .refine((value) => {
        if (!id && !value) {
          return false;
        }
        return true;
      }, "תפקיד משתמש הוא שדה חובה ביצירת מורה"),
    email: z
      .string()
      .email("כתובת אימייל לא תקינה")
      .optional()
      .refine((value) => {
        if (!id && !value) {
          return false;
        }
        return true;
      }, "אימייל הוא שדה חובה ביצירת מורה"),
  });

interface TeacherFormInputs {
  firstName: string;
  lastName: string;
  role: UserRole;
  email: string;
  types: TeacherType[];
}

export const TeacherForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: teacherInfo, isLoading } = useTeacherById(id);
  const schema = useMemo(() => schemaConfig(id), [id]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TeacherFormInputs>({
    resolver: zodResolver(schema),
  });

  const {
    updateTeacherMutation: { mutate: updateTeacher },
    createTeacherMutation: { mutate: createTeacher },
  } = useTeacherMutations();
  const {
    createUserMutation: { mutateAsync: createUser },
  } = useUserMutations();
  const onSubmit = useCallback(
    async (data: TeacherFormInputs) => {
      if (id) {
        updateTeacher({
          id: id,
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            types: data.types,
          },
        });
      } else {
        const userId = await createUser({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: Math.random().toString(36).slice(-8),
          role: data.role,
        });
        createTeacher({
          userId: userId._id,
          types: data.types,
        });
      }
      navigate("/admin/teachers");
    },
    [id, updateTeacher, createUser, createTeacher, navigate]
  );

  useEffect(() => {
    if (id && teacherInfo) {
      reset({
        firstName: teacherInfo.userId.first_name,
        lastName: teacherInfo.userId.last_name,
        types: teacherInfo.types,
      });
    }
  }, [id, teacherInfo, reset, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.title}>
          {id ? `עריכת מורה עם מזהה ${id}` : "יצירת מורה"}
        </h2>
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
          <label htmlFor="types">תפקיד</label>
          <div className={styles.checkboxGroup}>
            {Object.values(TeacherType).map((type) => (
              <label key={type}>
                <input type="checkbox" value={type} {...register("types")} />
                {type}
              </label>
            ))}
            {errors.types && (
              <p className={styles.error}>{errors.types.message}</p>
            )}
          </div>
        </div>
        {!id && (
          <>
            <div className={styles.inputGroup}>
              <label htmlFor="role">תפקיד משתמש</label>
              <select id="role" {...register("role")}>
                {Object.values(UserRole).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className={styles.error}>{errors.role.message}</p>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">אימייל</label>
              <input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>
          </>
        )}
        <button type="submit" className={styles.button}>
          שמירה
        </button>
      </form>
    </div>
  );
};
