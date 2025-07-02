import { ColDef } from "ag-grid-community";

export const questionnaireAnswersColumns: ColDef[] = [
  {
    headerName: "ID",
    field: "_id",
    sortable: true,
    filter: true,
    flex: 1,
  },
  {
    headerName: "Created At",
    field: "createdAt",
    valueFormatter: (params) => new Date(params.value).toLocaleString(),
    sortable: true,
    filter: true,
    flex: 1,
  },
  {
    headerName: "Questionnaire ID",
    field: "questionnaireId",
    sortable: true,
    filter: true,
    flex: 1,
  },
];
