import React from "react";
import Style from "./Content.module.css";
import { useSelectedClass } from "../../utils/customHooks/queries/useSelectedClass";

interface ContentProps {}

const COLUMNS = [
  {
    label: "שם התלמיד",
    renderCell: (item) => item.first_name + " " + item.last_name,
  },
  {
    label: "תאריך לידה",
    renderCell: (item) => item.birth_date,
  },
];

const Content: React.FC<ContentProps> = ({}) => {
  const { data: selectedClass } = useSelectedClass();

  if (!selectedClass) {
    return <div>בחר כיתה</div>;
  }

  return (
    <div className={Style.content}>
      <div className={Style.contentTitle}>
        {selectedClass ? `התלמידים של ${selectedClass.grade}` : "בחר כיתה"}
      </div>
      <div className={Style.scrollContainer}>
        {/* <CompactTable columns={COLUMNS} data={selectedClass.studentIds} /> */}
        {selectedClass.studentIds.map((student) => (
          <div key={student._id} className={Style.student}>
            <div className={Style.studentName}>
              {student.first_name} {student.last_name}
            </div>
            <div className={Style.studentBirthDate}>
              {new Date(student.birth_date).toLocaleDateString("he-IL")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
