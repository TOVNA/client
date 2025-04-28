import React from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { tableTheme } from "../../setupTable";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styles from "./AdminTable.module.css";

interface AdminTableProps {
  rowsData: any[];
  columns: ColDef[];
  navigateToPrefix: string;
  title: string;
  isLoading: boolean;
}

export const AdminTable: React.FC<AdminTableProps> = ({
  rowsData,
  columns,
  navigateToPrefix,
  title,
  isLoading,
}) => {
  const navigate = useNavigate();

  const onRowClicked = (row: any) => {
    const { id } = row.data;
    navigate(`${navigateToPrefix}/${id}`);
  };

  return (
    <div className={styles.adminTableContainer}>
      <div className={styles.tableTitle}>{title}</div>
      <AgGridReact
        loading={isLoading}
        loadingOverlayComponent={LoadingSpinner}
        theme={tableTheme}
        rowData={rowsData}
        columnDefs={columns}
        domLayout="autoHeight"
        defaultColDef={{
          flex: 1,
          sortable: true,
          resizable: true,
        }}
        onRowClicked={onRowClicked}
      />
    </div>
  );
};

export default AdminTable;
