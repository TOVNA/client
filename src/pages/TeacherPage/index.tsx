import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTeacherData } from '../../utils/customHooks/queries/useTeacherData';
import { Card } from '../../components/Card/Card';
import { AgGridReact } from 'ag-grid-react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import FullScreenMessage from '../../components/FullScreenMessage/FullScreenMessage';
import { tableTheme } from '../../setupTable';
import { ColDef, RowClickedEvent } from 'ag-grid-community';

const TeacherPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { teacher, questionnaires, classes, loading, error } = useTeacherData(id || '');
  const navigate = useNavigate();

  const questionnaireColumns: ColDef[] = [
    { headerName: 'תאריך', field: 'createdAt' },
    { headerName: 'סוג שאלון', field: 'title' },
    { headerName: 'שם התלמיד', field: 'studentName' },
  ];
  const questionnaireRows = questionnaires.map((q) => ({
    id: q._id,
    title: q.questionnaireId?.title || q.questionnaireId?._id,
    createdAt: q.createdAt ? new Date(q.createdAt).toLocaleString("he-IL") : '',
    studentName: q.studentId?.first_name + " " + q.studentId?.last_name
  }));

  const classColumns: ColDef[] = [
    { headerName: 'נושא', field: 'subject' },
    { headerName: 'סוג כיתה', field: 'classType' },
  ];
  const classRows = classes.map((c) => ({
    id: c._id,
    classType: c.classType,
    subject: c.subject,
  }));

  if (loading) return <LoadingSpinner />;
  if (error) return <FullScreenMessage title='קרתה בעיה לטעון את נתוני המורה, אנא נסה שוב מאוחר יותר.' />;

    const onRowClickedQuestionnaire = (row: RowClickedEvent<any, any>) => {
      if (row.event?.defaultPrevented) return;
      const { id } = row.data;
      navigate(`/feedback/${id}`);
    };
    
  return (
    <div>
      <Card>
        <h1 style={{ textDecoration: 'underline' }}>פרופיל מורה</h1>
        <div><b>שם מלא:</b> {teacher?.userId?.first_name} {teacher?.userId?.last_name}</div>
        <div><b>אימייל:</b> {teacher?.userId?.email}</div>
        <div><b>סוג מורה:</b> {teacher?.types?.join(', ')}</div>
      </Card>
      <Card>
        <h2>שאלונים שהושלמו</h2>
        <AgGridReact
          loading={loading}
          loadingOverlayComponent={LoadingSpinner}
          theme={tableTheme}
          rowData={questionnaireRows}
          columnDefs={questionnaireColumns}
          domLayout="autoHeight"
          defaultColDef={{
            flex: 1,
            sortable: true,
            resizable: true,
          }}
          noRowsOverlayComponent={() => <div style={{ textAlign: "center" }}>אין שאלונים שהושלמו</div>}
          onRowClicked={onRowClickedQuestionnaire}
        />
      </Card>
      <Card>
        <h2>הכיתות שלי</h2>
        <AgGridReact
          loading={loading}
          loadingOverlayComponent={LoadingSpinner}
          theme={tableTheme}
          rowData={classRows}
          columnDefs={classColumns}
          domLayout="autoHeight"
          defaultColDef={{
            flex: 1,
            sortable: true,
            resizable: true,
          }}
          noRowsOverlayComponent={() => <div style={{ textAlign: "center" }}>אין כיתות שהוקצו</div>}
        />
      </Card>
    </div>
  );
};

export default TeacherPage;
