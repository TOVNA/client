import { useMemo } from "react";
import { ColDef } from "ag-grid-community";
import Style from "./StudentsTable.module.css";
import AdminTable from "../AdminTable/AdminTable";
import { useAllStudents } from "../../utils/customHooks/queries/useAllStudents";
import { Student } from "../../types/entities/student";
import plusIcon from "../../assets/plus.svg";
import { useNavigate } from "react-router-dom";
import { useStudentMutations } from "../../utils/customHooks/mutations/useStudentMutations";
import deleteIcon from "../../assets/close.svg";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export const StudentsTable = () => {
  const { data: students = [], isLoading } = useAllStudents();
  const navigate = useNavigate();
  const { deleteStudentMutation } = useStudentMutations();

  const studentsData = useMemo(() => {
    return (students as Student[]).map((student) => ({
      name: `${student.first_name} ${student.last_name}`,
      birthDate: new Date(student.birth_date).toLocaleDateString("he-IL"),
      grade: student?.class?.grade || "*ללא כיתה*",
      id: student._id,
    }));
  }, [students]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      deleteStudentMutation.mutate(id);
    }
  };

  const columns: ColDef[] = [
    { headerName: "זיהוי", field: "id", flex: 1 },
    { headerName: "כיתה", field: "grade", flex: 1 },
    { headerName: "תאריך לידה", field: "birthDate", flex: 1 },
    { headerName: "שם מלא", field: "name", flex: 1 },
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AdminTable
      columns={columns}
      navigateToPrefix="/admin/student"
      title="רשימת תלמידים"
      isLoading={isLoading}
      rowsData={studentsData}
      titleButton={
        <img
          src={plusIcon}
          alt="add-student-button"
          className={Style.icon}
          onClick={() => navigate("/admin/student")}
        />
      }
    />
  );
};
