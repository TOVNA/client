import { useMemo } from "react";
import { ColDef } from "ag-grid-community";
import AdminTable from "../AdminTable/AdminTable";
import { useClasses } from "../../utils/customHooks/queries/useClasses";
import { Class } from "../../types/entities/class";

export const ClassesTable = () => {
  const { data: classes = [], isLoading } = useClasses();

  const classesData = useMemo(() => {
    return (classes as Class[]).map((schoolClass) => ({
      grade: schoolClass.grade,
      homeroomTeacherName: `${schoolClass.homeroomTeacherId.first_name} ${schoolClass.homeroomTeacherId.last_name}`,
      id: schoolClass._id
    }));
  }, [classes]);

  const columns: ColDef[] = [
    { headerName: "מורה מחנך", field: "homeroomTeacherName", flex: 1 },
    { headerName: "כיתה", field: "grade", flex: 1 },
  ];

  return (
    <AdminTable
      columns={columns}
      navigateToPrefix="/admin/class"
      title="רשימת כיתות"
      isLoading={isLoading}
      rowsData={classesData}
    />
  );
};
