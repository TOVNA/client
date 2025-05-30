import { useCallback, useEffect } from "react";
import Style from "./StudentPage.module.css";
import { calculateAgeDecimal } from "../../utils/date";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../Card/Card";
import plusIcon from "../../assets/plus.svg";
import { useSelectedStudent } from "../../utils/customHooks/queries/useSelectedStudent";
import closeIcon from "../../assets/close.svg";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const StudentPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: student, isLoading, error } = useSelectedStudent(id);
  const navigate = useNavigate();
  const studentBirthDate = new Date(student?.birth_date || "");

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className={Style.contentTitle}>
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
    </>
  );
};

export default StudentPage;
