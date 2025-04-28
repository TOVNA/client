import { useMemo } from "react";
import { ColDef } from "ag-grid-community";
import { useTeachers } from "../../utils/customHooks/queries/useTeachers";
import { Teacher } from "../../types/entities/teacher";
import AdminTable from "../AdminTable/AdminTable";

export const TeachersTable = () => {
  const { data: teachers = [], isLoading } = useTeachers();

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
  ];

  return (
    <AdminTable
      columns={columns}
      navigateToPrefix="/admin/teacher"
      title="רשימת מורים"
      isLoading={isLoading}
      rowsData={teachersData}
    />
  );
};
