import { useCallback, useEffect, useState } from "react";
import Style from "./StudentPage.module.css";
import { calculateAgeDecimal } from "../../utils/date";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../Card/Card";
import plusIcon from "../../assets/plus.svg";
import { useSelectedStudent } from "../../utils/customHooks/queries/useSelectedStudent";
import closeIcon from "../../assets/close.svg";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { LOCAL_STORAGE_KEYS } from "../../constants/LocalStorageKeys";
import { useGoalsByStudent } from "../../utils/customHooks/queries/useGoalsByStudent";
import { GoalCard } from "../GoalCard/GoalCard";
import { useStudentSnapshot } from "../../utils/customHooks/queries/useStudentSnapshot";
import { useGoalsMutations } from "../../utils/customHooks/mutations/useGoalsMutations";
import { useRefetchQueries } from "../../utils/customHooks/queries/useRefetchQueries";
import { useStudentMutations } from "../../utils/customHooks/mutations/useStudentMutations";
import { useAuth } from "../AuthContext";
import { UserRole } from "../../types/entities/user";
import Dashboard from "../../pages/Dashboard/Dashboard";
import { useStudentGradesByStudentId } from "../../utils/customHooks/queries/useStudentGrades";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const StudentPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: student, isLoading, error } = useSelectedStudent(id);
  const { data: snapshot } = useStudentSnapshot(id);
  const { data: goals } = useGoalsByStudent(id);
  const { data: grades } = useStudentGradesByStudentId(id);
  const navigate = useNavigate();
  const studentBirthDate = new Date(student?.birth_date || "");
  const [isProcessQuestionnairesDisabled, setIsProcessQuestionnairesDisabled] =
    useState(false);

  const { generateStudentGoalsMutation } = useGoalsMutations();
  const { refetchGoalsByStudent, refetchStudentSnapshot } = useRefetchQueries();
  const { generateStudentSnapshotMutation } = useStudentMutations();
  const currentStudentProcessQuestionnariesKey =
    LOCAL_STORAGE_KEYS.PROCESS_QUESTIONNAIRES_TIME_BY_STUDENT(id || "");
  const { user } = useAuth();

  const handleFillNewStudentFeedback = useCallback(() => {
    navigate("/feedback", {
      state: {
        studentName: student?.first_name + " " + student?.last_name,
        studentId: student?._id,
      },
    });
  }, [student, navigate]);

  useEffect(() => {
    if (error?.status === 404) {
      navigate("/not-found");
    }
  }, [error, navigate]);

  useEffect(() => {
    const savedDate = localStorage.getItem(
      currentStudentProcessQuestionnariesKey
    );
    if (savedDate) {
      const elapsed = Date.now() - new Date(savedDate).getTime();
      if (elapsed < ONE_DAY_MS) {
        setIsProcessQuestionnairesDisabled(true);
      } else {
        localStorage.removeItem(currentStudentProcessQuestionnariesKey);
      }
    }
  }, []);

  const handleProcessQuestionnariesClick = async () => {
    if (id) {
      await generateStudentGoalsMutation.mutateAsync({
        studentId: id,
        days: 30,
      });

      await generateStudentSnapshotMutation.mutateAsync({
        studentId: id,
        days: 30,
      });

      refetchGoalsByStudent(id);
      refetchStudentSnapshot(id);
    }

    localStorage.setItem(
      currentStudentProcessQuestionnariesKey,
      new Date().toISOString()
    );
    setIsProcessQuestionnairesDisabled(true);
  };

  if (
    isLoading ||
    generateStudentGoalsMutation.isLoading ||
    generateStudentSnapshotMutation.isLoading
  ) {
    return <LoadingSpinner />;
  }

  const studentSummary = snapshot?.[0]?.summary;

  return (
    <>
      <div className={Style.contentTitle}>
        <div className={Style.rightTitle}>
          {`תלמיד - ${student?.first_name} ${student?.last_name}`}
          {student && (
            <img
              src={closeIcon}
              className={Style.closeIcon}
              alt="close-student"
              onClick={() => navigate("/")}
            />
          )}
        </div>
        <button
          className={Style.processQuestionnairesButton}
          disabled={isProcessQuestionnairesDisabled}
          onClick={handleProcessQuestionnariesClick}
        >
          הרץ עיבוד שאלונים
        </button>
      </div>
      <div className={Style.details}>
        {student?.birth_date && (
          <>
            <h6>תאריך לידה:</h6>
            <div className={Style.date}>
              {studentBirthDate.toLocaleDateString("he-IL")}
            </div>
            <h6> ,גיל: </h6>
            <div className={Style.date}>
              {calculateAgeDecimal(studentBirthDate)}
            </div>
          </>
        )}
      </div>
      {studentSummary && (
        <Card>
          <div className={Style.summary}>{studentSummary}</div>
        </Card>
      )}
      <Card onClick={handleFillNewStudentFeedback}>
        <div className={Style.cardHeader}>
          מילוי חוות דעת על התלמיד
          <img
            src={plusIcon}
            alt="add-questionnaire-button"
            className={Style.icon}
          />
        </div>
      </Card>
      <Card onClick={() => navigate("goal")}>
        <div className={Style.cardHeader}>
          מטרות
          <img src={plusIcon} alt="add-goal-button" className={Style.icon} />
        </div>
      </Card>
      <div className={Style.goalsContainer}>
        {goals ? goals.map((goal) => <GoalCard goal={goal} />) : "ללא מטרות"}
      </div>
      {user?.role === UserRole.HOMEROOM && (
        <Dashboard studentStatus={snapshot} studentGrades={grades} />
      )}
    </>
  );
};

export default StudentPage;
