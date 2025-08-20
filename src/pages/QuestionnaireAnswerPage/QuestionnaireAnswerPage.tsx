import React from "react";
import { useParams } from "react-router-dom";
import { useQuestionnaireAnswerById } from "../../utils/customHooks/queries/useQuestionnaireAnswersByStudent";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import FullScreenMessage from "../../components/FullScreenMessage/FullScreenMessage";
import { Question } from "../../components/Question/Question";
import { useQuestionnaireById } from "../../utils/customHooks/queries/useQuestionnaireById";
import Style from './QuestionnaireAnswerPage.module.css'

interface QuestionnaireAnswerPageProps {}

const QuestionnaireAnswerPage: React.FC<
  QuestionnaireAnswerPageProps
> = ({}) => {
  const { id } = useParams<{ id: string }>();
  console.log("the id", id);
  const {
    data: answers,
    isLoading: isAnswersLoading,
    isError: isAnswersError,
  } = useQuestionnaireAnswerById(id);

  const questionnaireId = answers?.questionnaireId?._id;

  const {
    data: questions,
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
  } = useQuestionnaireById(answers?.questionnaireId?._id);

  console.log(questions);

  if (isAnswersLoading || (questionnaireId && isQuestionsLoading)) {
    return <LoadingSpinner />;
  }

  if (isAnswersError || (questionnaireId && isQuestionsError)) {
    return (
      <FullScreenMessage
        title="שגיאה בטעינת התוכן"
        message={"אנא נסה שנית מאוחר יותר"}
      />
    );
  }

  const getAnswerByQuestionId = (questionId: string) => {
    return (
      answers?.answerIds?.find((answer) => answer.questionId === questionId)
        ?.answerText || ""
    );
  };

  return (
    <div className={Style.questionnaireContent}>
      {questions?.questionIds?.map((question) => (
        <Question
          question={question}
          isEditable={false}
          answer={getAnswerByQuestionId(question._id)}
          key={question._id}
        />
      ))}
    </div>
  );
};

export default QuestionnaireAnswerPage;
