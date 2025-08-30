import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Style from "./GradeForm.module.css";
import { Student } from "../../../types/entities/student";
import { useGradeMutations } from "../../../utils/customHooks/mutations/useGradesMutations";
import { useCurrentUserClassSubjectByClass } from "../../../utils/customHooks/useCurrentUserClassSubjectByClass";

const schema = z.object({
  type: z.string().min(1, "סוג מטלה הוא שדה חובה"),
  description: z.string(),
  score: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(1, "ציון חייב להיות מספר תקין ובין 1 ל100")
      .max(100, "ציון חייב להיות מספר תקין ובין 1 ל100")
  ),
});

interface GradeFormInputs {
  type: string;
  description: string | null;
  score: string;
}

export const GradeForm: React.FC = () => {
  const { state } = useLocation();
  const student = state?.student as Student;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GradeFormInputs>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const { createGradeMutation } = useGradeMutations(student._id || "");

  const { currentUserClassSubject } = useCurrentUserClassSubjectByClass(
    student.class?._id || ""
  );

  const onSubmit = (data: GradeFormInputs) => {
    const grade = {
      type: data.type,
      description: data.description,
      score: Number(data.score),
      studentId: student._id,
      teacherId: currentUserClassSubject.teacherId._id,
      classSubjectId: currentUserClassSubject._id,
    };

    createGradeMutation.mutate(grade);

    navigate(`/student/${student._id}`);
  };

  return (
    <div className={Style.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={Style.form}>
        <h2 className={Style.title}>{"יצירת ציון"}</h2>
        <div className={Style.inputGroup}>
          <label htmlFor="type">סוג מטלה</label>
          <input id="type" {...register("type")} />
          {errors.type && <p className={Style.error}>{errors.type.message}</p>}
        </div>
        <div className={Style.inputGroup}>
          <label htmlFor="description">תיאור</label>
          <input id="description" {...register("description")} />
          {errors.description && (
            <p className={Style.error}>{errors.description.message}</p>
          )}
        </div>
        <div className={Style.inputGroup}>
          <label htmlFor="score">ציון</label>
          <input id="score" {...register("score")} type="number" />
          {errors.score && (
            <p className={Style.error}>{errors.score.message}</p>
          )}
        </div>

        <button type="submit" className={Style.button}>
          שמירה
        </button>
      </form>
    </div>
  );
};
