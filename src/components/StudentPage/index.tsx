import React, { useCallback } from "react";
import { Student } from "../../types/entities/student";
import Style from "./StudentPage.module.css";
import { calculateAgeDecimal } from "../../utils/date";
import { useNavigate } from "react-router-dom";
import { Card } from "../Card/Card";
import plusIcon from "../../assets/plus.svg";

interface StudentPageProps {
  student: Student;
}

const StudentPage: React.FC<StudentPageProps> = ({ student }) => {
  const studentBirthDate = new Date(student.birth_date);
  const navigate = useNavigate();
  const handleFillNewStudentFeedback = useCallback(() => {
    navigate("/feedback", {
      state: {
        studentName: student.first_name + " " + student.last_name,
        studentId: student._id,
      },
    });
  }, [student, navigate]);

  return (
    <div>
      <div className={Style.details}>
        {student.birth_date && (
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
    </div>
  );
};

export default StudentPage;
