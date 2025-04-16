import React from "react";
import { Student } from "../../types/entities/student";
import Style from "./StudentPage.module.css";
import { calculateAgeDecimal } from "../../utils/date";

interface StudentPageProps {
  student: Student;
}

const StudentPage: React.FC<StudentPageProps> = ({ student }) => {
  const studentBirthDate = new Date(student.birth_date);

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
    </div>
  );
};

export default StudentPage;
