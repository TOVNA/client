import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Style from "./ClassForm.module.css";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useClasses } from "../../../utils/customHooks/queries/useClasses";
import { Class } from "../../../types/entities/class";
import { useTeachers } from "../../../utils/customHooks/queries/useTeachers";
import { Teacher } from "../../../types/entities/teacher";
import { useAllStudents } from "../../../utils/customHooks/queries/useAllStudents";
import Select from "react-select";
import { useClassMutations } from "../../../utils/customHooks/mutations/useClassMutations";
import { ClassPayload } from "../../../types/entities/class";

const schema = z.object({
  grade: z.string().min(1, "שם כיתה הוא שדה חובה"),
  classNumber: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "מספר כיתה חייב להיות מספר תקין")
  ),
  homeroomTeacherId: z.string().min(1, "מורה מחנך הוא שדה חובה"),
  studentIds: z.array(z.string()).optional(),
});

interface ClassFormInputs {
  grade: string;
  classNumber: number;
  homeroomTeacherId: string;
  studentIds: string[];
}

export const ClassForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: classInfo, isLoading } = useClasses(id || "");
  const { data: teachers } = useTeachers();
  const { data: students } = useAllStudents();

  const aligbleStudents = students?.filter(
    (student) => student.class === null || student.class?._id === id
  );

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

  const { createClassMutation, updateClassMutation } = useClassMutations();

  const onSubmit = (data: ClassFormInputs) => {
    const schoolClass: ClassPayload = {
      grade: data.grade,
      classNumber: data.classNumber,
      homeroomTeacherId: data.homeroomTeacherId,
      studentIds: data.studentIds,
    };
    if (id) {
      updateClassMutation.mutate({ id, data: schoolClass });
    } else {
      createClassMutation.mutate(schoolClass);
    }
    navigate(`/admin/classes`);
  };

  useEffect(() => {
    if (classInfo) {
      const schoolClass = classInfo as Class;
      reset({
        grade: schoolClass.grade,
        classNumber: Number(schoolClass.classNumber),
        homeroomTeacherId: schoolClass.homeroomTeacherId?._id,
        studentIds: schoolClass.studentIds?.map((student) => student._id),
      });
    }
  }, [classInfo, reset]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const getSelectedHomeroomTeacher = (
    homeroomTeacherId: Class["homeroomTeacherId"]["_id"]
  ) => {
    return homeroomTeacherId
      ? (teachers as Teacher[])
          ?.map((teacher) => ({
            value: teacher.userId?._id,
            label: `${teacher.userId?.first_name} ${teacher.userId?.last_name}`,
          }))
          .find((option) => option.value === homeroomTeacherId)
      : null;
  };

  return (
    <div className={Style.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={Style.form}>
        <h2 className={Style.title}>
          {id ? `עריכת כיתה עם מזהה ${id}` : "יצירת כיתה"}
        </h2>
        <div className={Style.inputGroup}>
          <label htmlFor="grade">שם כיתה</label>
          <input id="grade" {...register("grade")} />
          {errors.grade && (
            <p className={Style.error}>{errors.grade.message}</p>
          )}
        </div>
        <div className={Style.inputGroup}>
          <label htmlFor="classNumber">מספר כיתה</label>
          <input id="classNumber" {...register("classNumber")} type="number" />
          {errors.classNumber && (
            <p className={Style.error}>{errors.classNumber.message}</p>
          )}
        </div>
        <div className={Style.inputGroup}>
          <label htmlFor="homeroomTeacherId">מורה מחנך</label>
          <Controller
            name="homeroomTeacherId"
            control={control}
            render={({ field }) => (
              <Select
                inputId="homeroomTeacherId"
                options={(teachers as Teacher[])?.map((teacher) => ({
                  value: teacher.userId?._id,
                  label: `${teacher.userId?.first_name} ${teacher.userId?.last_name}`,
                }))}
                placeholder="בחר מורה מחנך"
                value={getSelectedHomeroomTeacher(field.value)}
                onChange={(selected) => field.onChange(selected?.value)}
                isClearable
                classNamePrefix="react-select"
              />
            )}
          />

          {errors.homeroomTeacherId && (
            <p className={Style.error}>{errors.homeroomTeacherId.message}</p>
          )}
        </div>
        <div className={Style.inputGroup}>
          <label htmlFor="studentIds">תלמידים</label>
          <Controller
            name="studentIds"
            control={control}
            render={({ field }) => (
              <Select
                inputId="studentIds"
                isMulti
                options={aligbleStudents?.map((student) => ({
                  value: student._id,
                  label: `${student.first_name} ${student.last_name}`,
                }))}
                value={aligbleStudents
                  ?.filter((s) => field.value?.includes(s._id))
                  .map((s) => ({
                    value: s._id,
                    label: `${s.first_name} ${s.last_name}`,
                  }))}
                onChange={(selected) =>
                  field.onChange(selected.map((s) => s.value))
                }
                placeholder="בחר תלמידים..."
                classNamePrefix="react-select"
                styles={{
                  valueContainer: (base) => ({
                    ...base,
                    maxHeight: "100px",
                    overflowY: "auto",
                  }),
                  menuList: (base) => ({
                    ...base,
                    maxHeight: "100px",
                    overflowY: "auto",
                  }),
                }}
              />
            )}
          />
        </div>
        <button type="submit" className={Style.button}>
          שמירה
        </button>
      </form>
    </div>
  );
};
