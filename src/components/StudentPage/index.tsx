import { useEffect } from "react";
import Style from "./StudentPage.module.css";
import { calculateAgeDecimal } from "../../utils/date";
import { useSelectedStudent } from "../../utils/customHooks/queries/useSelectedStudent";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
import closeIcon from "../../assets/close.svg";

const StudentPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: student, isLoading, error } = useSelectedStudent(id);
  const navigate = useNavigate();
  const studentBirthDate = new Date(student?.birth_date || "");

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
    </>
  );
};

export default StudentPage;
