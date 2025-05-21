import React from "react";
import Style from "./QuestionnaireAnswerPage.module.css";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

interface QuestionnaireAnswerPageProps {}

const QuestionnaireAnswerPage: React.FC<QuestionnaireAnswerPageProps> = ({}) => {
  return (
    <div className={Style.questionnaireAnswersPage}>
      <Sidebar />
      <div className={Style.questionnaireContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default QuestionnaireAnswerPage;
