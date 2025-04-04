import React from "react";
import Style from "./Content.module.css";
import { useSelectedClassId } from "../SelectedClassContext/SelectedClassContext";
import { useSelectedClass } from "../../utils/customHooks/queries/useSelectedClass";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useStudentsByClass } from "../../utils/customHooks/queries/useStudents";

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
  const { selectedClassId } = useSelectedClassId();

  const { data: selectedClass } = useSelectedClass();
  const { data: students } = useStudentsByClass(selectedClassId);

  if (!selectedClassId) {
    return <div>בחר כיתה</div>;
  }

  return (
    <div className={Style.content}>
      <div className={Style.contentTitle}>
        {selectedClass ? `התלמידים של כיתה ${selectedClass.grade}` : "בחר כיתה"}
      </div>
      <div className={Style.scrollContainer}>
        <CompactTable columns={COLUMNS} data={students} />
      </div>
    </div>
  );
};

export default Content;
