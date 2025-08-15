import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuestionnaireByTeacherType } from "../../utils/customHooks/queries/useQuestionnaireByTeacherType";
import { useAuth } from "../../components/AuthContext";
import { UserRole } from "../../types/entities/user";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Question } from "../../components/Question/Question";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Answer } from "../../types/entities/answer";
import { useLocation, useNavigate } from "react-router-dom";
import { useInsertQuestionnaire } from "../../utils/customHooks/mutations/useInsertQuestionnaire";
import styles from "./Feedback.module.css";
import closeIcon from "../../assets/close.svg";
import FullScreenMessage from "../../components/FullScreenMessage/FullScreenMessage";
import { useStudentById } from "../../utils/customHooks/queries/useStudentById";
import { useClasses } from "../../utils/customHooks/queries/useClasses";
import { useClassSubjects } from "../../utils/customHooks/queries/useClassSubjects";
import { Class } from "../../types/entities/class";
import { ClassSubject } from "../../types/entities/classSubject";

// Props for the QuestionnairePage component
interface QuestionnairePageProps {
  isEditable?: boolean;
}

// Form data type
interface FormData {
  [key: string]: string;
}

// QuestionnairePage component
const QuestionnairePage: React.FC<QuestionnairePageProps> = ({
  isEditable = true,
}) => {
  const { user } = useAuth();
  const { state } = useLocation();
  const studentId = state?.studentId;
  const studentName = state?.studentName;
  const navigate = useNavigate();

  const { data: studentData } = useStudentById(studentId);
  const { data: studentClass } = useClasses(studentData?.class?._id);
  const { data: classSubjects } = useClassSubjects();

  if (!studentId || !studentName || !user) {
    navigate("/"); // Redirect if studentId or studentName is not provided
  }

  const { mutate: insertQuestionnaireMutation } = useInsertQuestionnaire();

  const teacherType = useMemo(() => {
    if (
      (studentClass as Class)?.homeroomTeacherId?._id === (user as any)?.userId
    )
      return UserRole.HOMEROOM;

    const subjectTeacher = (classSubjects as ClassSubject[])
      ?.filter(
        (classSubject) =>
          classSubject?.classId?._id === (studentClass as Class)?._id
      )
      .find(
        (classSubject) =>
          classSubject?.teacherId?.userId?._id === (user as any)?.userId
      );

    if (subjectTeacher) {
      return UserRole.TEACHER;
    }
  }, [user, studentData, classSubjects, studentClass]);

  const { data, isLoading, isError } = useQuestionnaireByTeacherType(
    teacherType || UserRole.TEACHER
  );
  // Dynamically create a Zod schema based on the questionnaire
  const schema = useMemo(() => {
    if (!data) return z.object({});
    const shape = data?.questionIds?.reduce((acc, question) => {
      acc[question._id] = z.string().min(1, "חובה למלא תשובה");
      return acc;
    }, {} as Record<string, z.ZodTypeAny>);
    return z.object(shape);
  }, [data]);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data?.questionIds?.reduce((acc, question) => {
      acc[question._id] = "";
      return acc;
    }, {} as Record<string, string>),
  });

  const onSubmit = (formData: FormData) => {
    const questionnaireAnswers: Answer[] = Object.entries(formData).map(
      ([questionId, answer]) => ({
        answerText: answer,
        questionnaireAnswerId: data?._id as string,
        questionId,
      })
    );

    const responseData = {
      answers: questionnaireAnswers,
      questionnaireId: data?._id as string,
      teacherId: user?._id as string,
      studentId: studentId,
    };

    insertQuestionnaireMutation(responseData);
    navigate("/", { state: null });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <FullScreenMessage
        title="שגיאה בטעינת שאלון"
        message="אנא נסה שנית מאוחר יותר"
      />
    );
  }

  if (!teacherType) {
    return (
      <FullScreenMessage
        title="שגיאה בטעינת שאלון"
        message="המשתמש לא מורה מחנך/מקצועי של התלמיד"
      />
    );
  }

  return (
    <div>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{`שאלון עבור תלמיד ${studentName}`}</h1>
        {
          <img
            src={closeIcon}
            className={styles.closeIcon}
            alt="close-questionnaire"
            onClick={() => navigate(-1)}
          />
        }
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {data?.questionIds?.map((question) => (
          <Controller
            key={question._id}
            name={question._id}
            control={control}
            render={({ field, fieldState }) => (
              <Question
                question={question}
                isEditable={isEditable}
                answer={field.value}
                onAnswerChange={field.onChange}
                error={fieldState.error && "חובה למלא תשובה"}
              />
            )}
          />
        ))}
        {isEditable && (
          <button type="submit" className={styles.button}>
            שליחה
          </button>
        )}
      </form>
    </div>
  );
};

export default QuestionnairePage;
