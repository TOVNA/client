import React, { useCallback } from "react";
import Style from "./Content.module.css";
import { useSelectedClass } from "../../utils/customHooks/queries/useSelectedClass";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { tableTheme } from "../../setupTable";
import FullScreenMessage from "../FullScreenMessage/FullScreenMessage";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useSelectedClassId } from "../SelectedClassContext/SelectedClassContext";

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
  const { data: selectedClass, isLoading } = useSelectedClass();
  const { selectedClassLabel } = useSelectedClassId();
  const navigate = useNavigate();

  const getContentTitle = useCallback(() => {
    if (selectedClass) {
      return `התלמידים של ${selectedClassLabel}`;
    }

    return "בחר כיתה";
  }, [selectedClass, selectedClassLabel]);

  if (!selectedClass) {
    return (
      <FullScreenMessage
        title="לא נבחרה כיתה"
        message="בחר כיתה מהתפריט על מנת לראות את התלמידים"
      />
    );
  }

  const onRowClicked = (row: any) => {
    navigate(`/student/${row.data._id}`);
  };

  return (
    <div className={Style.content}>
      <div className={Style.contentTitle}>{getContentTitle()}</div>
      <div className={Style.scrollContainer}>
        <div style={{ width: "100%", height: "100%" }}>
          <AgGridReact
            loading={isLoading}
            onRowClicked={onRowClicked}
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
            loadingOverlayComponent={LoadingSpinner}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
