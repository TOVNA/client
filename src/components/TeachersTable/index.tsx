import { useMemo } from "react";
import { ColDef } from "ag-grid-community";
import { useTeachers } from "../../utils/customHooks/queries/useTeachers";
import { Teacher } from "../../types/entities/teacher";
import AdminTable from "../AdminTable/AdminTable";
import plusIcon from "../../assets/plus.svg";
import deleteIcon from "../../assets/close.svg";
import Style from "./TeachersTable.module.css";
import { useNavigate } from "react-router-dom";
import { useTeacherMutations } from "../../utils/customHooks/mutations/useTeachersMutations";

export const TeachersTable = () => {
  const { data: teachers = [], isLoading } = useTeachers();
  const {
    deleteTeacherMutation: { mutate: deleteTeacher },
  } = useTeacherMutations();
  const navigate = useNavigate();

  const teachersData = useMemo(() => {
    return (teachers as Teacher[]).map((teacher) => ({
      name: teacher?.userId?.first_name + " " + teacher?.userId?.last_name,
      type: teacher?.types?.join(", ") || "-",
      id: teacher?._id,
    }));
  }, [teachers]);

  const columns: ColDef[] = [
    { headerName: "זיהוי", field: "id", flex: 1 },
    { headerName: "סוג", field: "type", flex: 1 },
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
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      deleteTeacher(id);
    }
  };

  return (
    <AdminTable
      columns={columns}
      navigateToPrefix="/admin/teacher"
      title="רשימת מורים"
      isLoading={isLoading}
      rowsData={teachersData}
      titleButton={
        <img
          src={plusIcon}
          alt="add-teacher-button"
          className={Style.icon}
          onClick={() => navigate("/admin/teacher")}
        />
      }
    />
  );
};
