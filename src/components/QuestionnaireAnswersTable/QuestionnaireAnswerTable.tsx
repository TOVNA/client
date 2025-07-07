import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { RowClickedEvent } from "ag-grid-community";
import styles from "./QuestionnaireAnswerTable.module.css";
import { questionnaireAnswersColumns } from "./columns";
import { useQuestionnaireAnswersByStudent } from "../../utils/customHooks/queries/useQuestionnaireAnswersByStudent";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { tableTheme } from "../../setupTable";
import { Card } from "../Card/Card";

interface Props {
  studentId: string;
}

const QuestionnaireAnswersTable: React.FC<Props> = ({ studentId }) => {
  const {
    data: answers = [],
    isLoading,
    error,
  } = useQuestionnaireAnswersByStudent(studentId);
  const navigate = useNavigate();

  const data = useMemo(
    () =>
      answers.map((answer) => ({
        _id: answer._id,
        createdAt: answer.createdAt,
        questionnaireType: answer.questionnaireId?.title ?? "-",
      })),
    [answers]
  );

  // if (isLoading) return <LoadingSpinner />;
  if (error) return null;

  const onRowClicked = (event: RowClickedEvent) => {
    const questionnaireAnswerId = event.data._id;
    if (questionnaireAnswerId) {
      navigate(`/feedback/${questionnaireAnswerId}`);
    }
  };

  return (
    <Card>
      <div className={styles.tableContainer}>
        <AgGridReact
          rowData={data}
          loading={isLoading}
          loadingOverlayComponent={LoadingSpinner}
          theme={tableTheme}
          columnDefs={questionnaireAnswersColumns}
          domLayout="autoHeight"
          onRowClicked={onRowClicked}
        />
      </div>
    </Card>
  );
};

export default QuestionnaireAnswersTable;
