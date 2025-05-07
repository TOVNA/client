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

const schema = z.object({
  grade: z.string().min(1, "שם כיתה הוא שדה חובה"),
  classNumber: z
    .string()
    .min(1, "מספר כיתה הוא שדה חובה")
    .transform((val) => parseInt(val, 10))
    .refine((num) => !isNaN(num) && num >= 1, {
      message: "מספר כיתה חייב להיות מספר תקין",
    }),
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
    (student) => student.class_id === null || student.class_id?._id === id
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

  // const { createStudentMutation, updateStudentMutation } =
  //   useStudentMutations();

  const onSubmit = (data: ClassFormInputs) => {
    // TODO
    // console.log(data);
    // const student: StudentInfo = {
    //   first_name: data.firstName,
    //   last_name: data.lastName,
    //   birth_date: new Date(data.birthDate),
    //   class_id: data.classId || null,
    // };

    // if (id) {
    //   updateStudentMutation.mutate({ id, data: student });
    // } else {
    //   createStudentMutation.mutate(student);
    // }

    // navigate(`/admin/students`);
    // updateTeacher({
    //   id: id || "",
    //   data: {
    //     first_name: data.firstName,
    //     last_name: data.lastName,
    //     types: data.role,
    //   },
    // });
  };

  useEffect(() => {
    if (classInfo) {
      const schoolClass = classInfo as Class;
      reset({
        grade: schoolClass.grade,
        classNumber: Number(schoolClass.classNumber),
        homeroomTeacherId: schoolClass.homeroomTeacherId?._id,
        studentIds: schoolClass.studentIds.map((student) => student._id),
      });
    }
  }, [classInfo, reset]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
                value={
                  (teachers as Teacher[])
                    ?.filter((t) => t.userId?._id === field.value)
                    .map((t) => ({
                      value: t.userId?._id,
                      label: `${t.userId?.first_name} ${t.userId?.last_name}`,
                    }))[0] || null
                }
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
