import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Style from "./ClassSubjectForm.module.css";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useClasses } from "../../../utils/customHooks/queries/useClasses";
import { Class } from "../../../types/entities/class";
import { useTeachers } from "../../../utils/customHooks/queries/useTeachers";
import { Teacher } from "../../../types/entities/teacher";
import Select from "react-select";
import { useClassSubjects } from "../../../utils/customHooks/queries/useClassSubjects";
import {
  ClassSubject,
} from "../../../types/entities/classSubject";
import { useClassSubjectMutations } from "../../../utils/customHooks/mutations/useClassSubjectMutations";

const schema = z.object({
  subject: z.string().min(1, "מקצוע הוא שדה חובה"),
  teacherId: z.string().min(1, "מורה הוא שדה חובה"),
  classId: z.string().min(1, "כיתה היא שדה חובה"),
});

interface ClassFormInputs {
  subject: string;
  teacherId: string;
  classId: string;
}

export const ClassSubjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: classSubjectInfo, isLoading } = useClassSubjects(id || "");
  const { data: teachers } = useTeachers();
  const { data: classes } = useClasses();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ClassFormInputs>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const { createClassSubjectMutation, updateClassSubjectMutation } =
    useClassSubjectMutations();

  const onSubmit = (data: ClassFormInputs) => {
    if (id) {
      updateClassSubjectMutation.mutate({ id, data });
    } else {
      createClassSubjectMutation.mutate(data);
    }
    navigate(`/admin/class-subjects`);
  };

  useEffect(() => {
    if (classSubjectInfo) {
      const classSubject = classSubjectInfo as ClassSubject;
      reset({
        subject: classSubject.subject,
        teacherId: classSubject.teacherId?._id,
        classId: classSubject.classId?._id,
      });
    }
  }, [classSubjectInfo, reset]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const getSelectedTeacher = (teacherId: Teacher["_id"]) => {
    return teacherId
      ? (teachers as Teacher[])
          ?.map((teacher) => ({
            value: teacher?._id,
            label: `${teacher.userId?.first_name} ${teacher.userId?.last_name}`,
          }))
          .find((option) => option.value === teacherId)
      : null;
  };

  const getSelectedClass = (classId: Class["_id"]) => {
    return classId
      ? (classes as Class[])
          ?.map((schoolClass) => ({
            value: schoolClass._id,
            label: schoolClass.grade,
          }))
          .find((option) => option.value === classId)
      : null;
  };

  return (
    <div className={Style.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={Style.form}>
        <h2 className={Style.title}>
          {id ? `עריכת מורה מקצועי עם מזהה ${id}` : "יצירת מורה מקצועי"}
        </h2>
        <div className={Style.inputGroup}>
          <label htmlFor="subject">מקצוע</label>
          <input id="subject" {...register("subject")} />
          {errors.subject && (
            <p className={Style.error}>{errors.subject.message}</p>
          )}
        </div>
        <div className={Style.inputGroup}>
          <label htmlFor="teacherId">מורה</label>
          <Controller
            name="teacherId"
            control={control}
            render={({ field }) => (
              <Select
                inputId="teacherId"
                options={(teachers as Teacher[])?.map((teacher) => ({
                  value: teacher?._id,
                  label: `${teacher.userId?.first_name} ${teacher.userId?.last_name}`,
                }))}
                placeholder="בחר מורה"
                value={getSelectedTeacher(field.value)}
                onChange={(selected) => field.onChange(selected?.value)}
                isClearable
                classNamePrefix="react-select"
              />
            )}
          />

          {errors.teacherId && (
            <p className={Style.error}>{errors.teacherId.message}</p>
          )}
        </div>
        <div className={Style.inputGroup}>
          <label htmlFor="classId">כיתה</label>
          <Controller
            name="classId"
            control={control}
            render={({ field }) => (
              <Select
                inputId="classId"
                options={(classes as Class[])?.map((schoolClass) => ({
                  value: schoolClass._id,
                  label: schoolClass.grade,
                }))}
                placeholder="בחר כיתה"
                value={getSelectedClass(field.value)}
                onChange={(selected) => field.onChange(selected?.value)}
                isClearable
                classNamePrefix="react-select"
              />
            )}
          />

          {errors.classId && (
            <p className={Style.error}>{errors.classId.message}</p>
          )}
        </div>

        <button type="submit" className={Style.button}>
          שמירה
        </button>
      </form>
    </div>
  );
};
