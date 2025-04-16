import React, { useCallback } from "react";
import Style from "./Content.module.css";
import { useSelectedClass } from "../../utils/customHooks/queries/useSelectedClass";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { tableTheme } from "../../setupTable";
import FullScreenMessage from "../FullScreenMessage/FullScreenMessage";
import { useSelectedStudent } from "../../utils/customHooks/queries/useSelectedStudent";
import { useSelectedStudentId } from "../SelectedStudentContext/SelectedStudentContext";
import StudentPage from "../StudentPage";
import closeIcon from "../../assets/close.svg";

interface ContentProps {}

const COLUMNS: ColDef[] = [
  {
    headerName: "שם התלמיד",
    colId: "fullName",
    cellRenderer: (params) =>
      `${params.data.first_name} ${params.data.last_name}`,
    flex: 1,
    resizable: false,
  },
  {
    headerName: "תאריך לידה",
    colId: "birthDate",
    cellRenderer: (params) =>
      new Date(params.data.birth_date).toLocaleDateString("he-IL"),
    flex: 1,
    resizable: false,
  },
];

const Content: React.FC<ContentProps> = ({}) => {
  const { data: selectedClass } = useSelectedClass();
  const { setSelectedStudentId } = useSelectedStudentId();
  const { data: selectedStudent } = useSelectedStudent();

  const getContentTitle = useCallback(() => {
    if (selectedStudent) {
      return `תלמיד - ${selectedStudent.first_name} ${selectedStudent.last_name}`;
    }

    if (selectedClass) {
      return `התלמידים של ${selectedClass.grade}`;
    }

    return "בחר כיתה";
  }, [selectedStudent, selectedClass]);

  if (!selectedClass) {
    return (
      <FullScreenMessage
        title="לא נבחרה כיתה"
        message="בחר כיתה מהתפריט על מנת לראות את התלמידים"
      />
    );
  }

  return (
    <div className={Style.content}>
      <div className={Style.contentTitle}>
        {getContentTitle()}
        {selectedStudent && (
          <img
            src={closeIcon}
            className={Style.closeIcon}
            alt="close-student"
            onClick={() => setSelectedStudentId(undefined)}
          />
        )}
      </div>
      <div className={Style.scrollContainer}>
        <div style={{ width: "100%", height: "100%" }}>
          {selectedStudent ? (
            <StudentPage student={selectedStudent} />
          ) : (
            <AgGridReact
              onRowClicked={(row) => setSelectedStudentId(row.data._id)}
              theme={tableTheme}
              rowData={selectedClass.studentIds}
              columnDefs={COLUMNS}
              domLayout="autoHeight"
              defaultColDef={{
                flex: 1,
                sortable: true,
              }}
              noRowsOverlayComponent={() => (
                <div style={{ textAlign: "center" }}>אין תלמידים בכיתה</div>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
