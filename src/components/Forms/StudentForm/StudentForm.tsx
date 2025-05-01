import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Style from "./StudentForm.module.css";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useStudentById } from "../../../utils/customHooks/queries/useStudentById";
import { useStudentMutations } from "../../../utils/customHooks/mutations/useStudentMutations";
import { StudentInfo } from "../../../types/entities/student";
import { useClasses } from "../../../utils/customHooks/queries/useClasses";
import { Class } from "../../../types/entities/class";

const schema = z.object({
  firstName: z.string().min(1, "שם פרטי הוא שדה חובה"),
  lastName: z.string().min(1, "שם משפחה הוא שדה חובה"),
  birthDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "תאריך לא תקין" })
    .transform((val) => new Date(val))
    .refine((date) => date < new Date(), {
      message: "תאריך לידה חייב להיות בעבר",
    }),
  classId: z
    .string()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
});

interface StudentFormInputs {
  firstName: string;
  lastName: string;
  birthDate: string;
  classId: string | null;
}

export const StudentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: studentInfo, isLoading } = useStudentById(id || "");
  const { data: classes } = useClasses();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentFormInputs>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const { createStudentMutation, updateStudentMutation } =
    useStudentMutations();

  const onSubmit = (data: StudentFormInputs) => {
    const student: StudentInfo = {
      first_name: data.firstName,
      last_name: data.lastName,
      birth_date: new Date(data.birthDate),
      class_id: data.classId || null,
    };

    if (id) {
      updateStudentMutation.mutate({ id, data: student });
    } else {
      createStudentMutation.mutate(student);
    }

    navigate(`/admin/students`);
  };

  useEffect(() => {
    console.log(studentInfo);
    if (studentInfo) {
      reset({
        firstName: studentInfo.first_name,
        lastName: studentInfo.last_name,
        birthDate: `${studentInfo.birth_date}`.slice(0, 10),
        classId: studentInfo.class_id?._id ?? "",
      });
    }
  }, [studentInfo, reset]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={Style.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={Style.form}>
        <h2 className={Style.title}>
          {id ? `עריכת תלמיד עם מזהה ${id}` : "יצירת תלמיד"}
        </h2>
        <div className={Style.inputGroup}>
          <label htmlFor="firstName">שם פרטי</label>
          <input id="firstName" {...register("firstName")} />
          {errors.firstName && (
            <p className={Style.error}>{errors.firstName.message}</p>
          )}
        </div>
        <div className={Style.inputGroup}>
          <label htmlFor="lastName">שם משפחה</label>
          <input id="lastName" {...register("lastName")} />
          {errors.lastName && (
            <p className={Style.error}>{errors.lastName.message}</p>
          )}
        </div>
        <div className={Style.inputGroup}>
          <label htmlFor="birthDate">תאריך לידה</label>
          <input
            className={Style.birthdate}
            id="birthDate"
            {...register("birthDate")}
            type="date"
          />
          {errors.birthDate && (
            <p className={Style.error}>{errors.birthDate.message}</p>
          )}
        </div>
        <div className={Style.inputGroup}>
          <label htmlFor="classId">כיתה</label>
          <select id="classId" {...register("classId")}>
            <option value="">ללא כיתה</option>
            {(classes as Class[])?.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.grade}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={Style.button}>
          שמירה
        </button>
      </form>
    </div>
  );
};
