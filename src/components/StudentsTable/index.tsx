import { useMemo } from "react";
import { ColDef } from "ag-grid-community";
import Style from "./StudentsTable.module.css";
import AdminTable from "../AdminTable/AdminTable";
import { useAllStudents } from "../../utils/customHooks/queries/useAllStudents";
import { Student } from "../../types/entities/student";
import plusIcon from "../../assets/plus.svg";
import { useNavigate } from "react-router-dom";

export const StudentsTable = () => {
  const { data: students = [], isLoading } = useAllStudents();
  const navigate = useNavigate();

  const studentsData = useMemo(() => {
    return (students as Student[]).map((student) => ({
      name: `${student.first_name} ${student.last_name}`,
      birthDate: new Date(student.birth_date).toLocaleDateString("he-IL"),
      grade: student?.class_id?.grade || "*ללא כיתה*",
      id: student._id,
    }));
  }, [students]);

  const columns: ColDef[] = [
    { headerName: "כיתה", field: "grade", flex: 1 },
    { headerName: "תאריך לידה", field: "birthDate", flex: 1 },
    { headerName: "שם מלא", field: "name", flex: 1 },
  ];

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
