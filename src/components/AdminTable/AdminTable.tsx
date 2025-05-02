import React from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { ColDef, RowClickedEvent } from "ag-grid-community";
import { tableTheme } from "../../setupTable";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styles from "./AdminTable.module.css";

interface AdminTableProps {
  rowsData: any[];
  columns: ColDef[];
  navigateToPrefix: string;
  title: string;
  isLoading: boolean;
  titleButton?: React.ReactNode;
}

export const AdminTable: React.FC<AdminTableProps> = ({
  rowsData,
  columns,
  navigateToPrefix,
  title,
  isLoading,
  titleButton,
}) => {
  const navigate = useNavigate();

  const onRowClicked = (row: RowClickedEvent<any, any>) => {
    if (row.event?.defaultPrevented) return;
    const { id } = row.data;
    navigate(`${navigateToPrefix}/${id}`);
  };

  return (
    <div className={styles.adminTableContainer}>
      <div className={styles.tableTitle}>
        <div className={styles.title}>{title}</div>
        {titleButton}
      </div>
      <div className={styles.tableWrapper}>
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
    </div>
  );
};

export default AdminTable;
