import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styles from "./QuestionnaireAnswerTable.module.css";
import { questionnaireAnswersColumns } from "./columns";
import { useQuestionnaireAnswers } from "../../utils/customHooks/queries/useQuestionnaireAnswersByStudent";
import { useNavigate } from "react-router-dom";

interface Props {
  studentId: string;
}

const QuestionnaireAnswersTable: React.FC<Props> = ({ studentId }) => {
  const { answers, loading, error } = useQuestionnaireAnswers(studentId);
  const navigate = useNavigate();

  if (loading) return <p>Loading questionnaire answers...</p>;
  if (error) return <p>Error: {error}</p>;

  const onRowClicked = (event: any) => {
    const questionnaireAnswerId = event.data._id;  // adjust if your ID field has different name
    if (questionnaireAnswerId) {
      navigate(`/questionnaire-answer/${questionnaireAnswerId}`);
    }
  };

  return (
    <div className={`ag-theme-alpine ${styles.tableContainer}`}>
      <AgGridReact
        rowData={answers}
        columnDefs={questionnaireAnswersColumns}
        domLayout="autoHeight"
        onRowClicked={onRowClicked}
      />
    </div>
  );
};

export default QuestionnaireAnswersTable;
