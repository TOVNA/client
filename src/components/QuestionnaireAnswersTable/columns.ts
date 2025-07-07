import { ColDef } from "ag-grid-community";

export const questionnaireAnswersColumns: ColDef[] = [
  {
    headerName: "מזהה שאלון",
    field: "_id",
    sortable: true,
    filter: true,
    flex: 1,
  },
  {
    headerName: "תאריך יצירה",
    field: "createdAt",
    valueFormatter: (params) => new Date(params.value).toLocaleString("he-IL"),
    sortable: true,
    filter: true,
    flex: 1,
  },
  {
    headerName: "מזהה סוג שאלון",
    field: "questionnaireType",
    sortable: true,
    filter: true,
    flex: 1,
  },
];
