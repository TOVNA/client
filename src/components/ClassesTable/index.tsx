import { useMemo } from "react";
import { ColDef } from "ag-grid-community";
import AdminTable from "../AdminTable/AdminTable";
import { useClasses } from "../../utils/customHooks/queries/useClasses";
import { Class } from "../../types/entities/class";
import plusIcon from "../../assets/plus.svg";
import { useNavigate } from "react-router-dom";
import Style from "./ClassTable.module.css";
import deleteIcon from "../../assets/close.svg";
import { useClassMutations } from "../../utils/customHooks/mutations/useClassMutations";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export const ClassesTable = () => {
  const { data: classes = [], isLoading } = useClasses();
  const navigate = useNavigate();

  const classesData = useMemo(() => {
    return (classes as Class[])?.map((schoolClass) => ({
      grade: schoolClass.grade,
      homeroomTeacherName: `${schoolClass?.homeroomTeacherId?.first_name} ${schoolClass?.homeroomTeacherId?.last_name}`,
      id: schoolClass._id,
    }));
  }, [classes]);

  const { deleteClassMutation } = useClassMutations();

  const columns: ColDef[] = [
    { headerName: "זיהוי", field: "id", flex: 1 },
    { headerName: "מורה מחנך", field: "homeroomTeacherName", flex: 1 },
    { headerName: "כיתה", field: "grade", flex: 1 },
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
    if (window.confirm("Are you sure you want to delete this class?")) {
      deleteClassMutation.mutate({ id });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AdminTable
      columns={columns}
      navigateToPrefix="/admin/class"
      title="רשימת כיתות"
      isLoading={isLoading}
      rowsData={classesData}
      titleButton={
        <img
          src={plusIcon}
          alt="add-class-button"
          className={Style.icon}
          onClick={() => navigate("/admin/class")}
        />
      }
    />
  );
};
