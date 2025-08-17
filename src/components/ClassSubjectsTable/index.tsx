import { useMemo } from "react";
import { ColDef } from "ag-grid-community";
import AdminTable from "../AdminTable/AdminTable";
import plusIcon from "../../assets/plus.svg";
import deleteIcon from "../../assets/close.svg";
import Style from "./ClassSubjectsTable.module.css";
import { useNavigate } from "react-router-dom";
import { useClassSubjects } from "../../utils/customHooks/queries/useClassSubjects";
import { ClassSubject } from "../../types/entities/classSubject";
import { useClassSubjectMutations } from "../../utils/customHooks/mutations/useClassSubjectMutations";

export const ClassSubjectsTable = () => {
  const { data: classSubjects = [], isLoading } = useClassSubjects();
  const {
    deleteClassSubjectMutation: { mutate: deleteClassSubject },
  } = useClassSubjectMutations();
  const navigate = useNavigate();

  const classSubjectsData = useMemo(() => {
    return (classSubjects as ClassSubject[]).map((classSubject) => ({
      name:
        classSubject?.teacherId?.userId?.first_name +
        " " +
        classSubject?.teacherId?.userId?.last_name,
      className: classSubject?.classId?.grade,
      subject: classSubject.subject,
      id: classSubject?._id,
    }));
  }, [classSubjects]);

  const columns: ColDef[] = [
    { headerName: "זיהוי", field: "id", flex: 1 },
    { headerName: "מקצוע", field: "subject", flex: 1 },
    { headerName: "כיתה", field: "className", flex: 1 },
    { headerName: "שם המורה", field: "name", flex: 1 },
    {
      headerName: "פעולות",
      field: "actions",
      flex: 1,
      cellRenderer: (params: any) => (
        <img
          src={deleteIcon}
          alt="delete-teacher-button"
          className={Style.icon}
          onClick={(event) => {
            event.preventDefault();
            handleDelete(params.data.id);
          }}
        />
      ),
    },
  ];

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this subject class?")) {
      deleteClassSubject({ id });
    }
  };

  return (
    <AdminTable
      columns={columns}
      navigateToPrefix="/admin/class-subject"
      title="רשימת מורים מקצועיים"
      isLoading={isLoading}
      rowsData={classSubjectsData}
      titleButton={
        <img
          src={plusIcon}
          alt="add-class-subject-button"
          className={Style.icon}
          onClick={() => navigate("/admin/class-subject")}
        />
      }
    />
  );
};
