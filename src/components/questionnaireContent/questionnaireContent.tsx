import React, { useState, useEffect } from "react";
import Style from "./questionnaireContent.module.css";
import { getQuestionnaireAnwerById, getQuestionById } from "../../utils/api/questionnaireAnwer";

interface QuestionnaireAnswer {
  questionnaireId: {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
  };
  teacherId: { _id: string };
  studentId: { _id: string; first_name: string; last_name: string };
  answerIds: {
    _id: string;
    questionId: string;
    answerText: string;
    createdAt: string;
  }[];
  _id: string;
  createdAt: string;
}

interface Question {
  _id: string;
  description: string;
  text: string;
  type: string;
  scale?: {
    min: number;
    max: number;
  };
}

const QuestionnaireAnswerDisplay = () => {
  const [answerData, setAnswerData] = useState<QuestionnaireAnswer | null>(null);
  const [questionsMap, setQuestionsMap] = useState<Record<string, Question>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const id = "6829c4e3665390cfb71535da"; // TODO: make this dynamic if needed

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuestionnaireAnwerById(id);
        if (!data) throw new Error("No questionnaire answer found.");
        
        setAnswerData(data); 

        const uniqueQuestionIds: string[] = Array.from(
          new Set(
            data.answerIds.map((answer: { questionId: string }) => answer.questionId)
          )
        );

        const questions = await Promise.all(
          uniqueQuestionIds.map(async (qid) => {
            const question = await getQuestionById(qid);
            return { id: qid, data: question };
          })
        );

        const questionMap: Record<string, Question> = {};
        questions.forEach((q) => {
          if (q.data) {
            questionMap[q.id] = q.data;
          }
        });
        setQuestionsMap(questionMap);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  if (!answerData) return <div className="flex justify-center items-center h-screen">No data found.</div>;

  return (
    <div className={Style.questionnaireAnswerDisplay}>
      <h1 className={Style.questionnaireTitle}>{answerData.questionnaireId.title}</h1>
      <p className={Style.questionnaireDescription}>{answerData.questionnaireId.description}</p>
      <p className={Style.questionnaireDate}>נוצר בתאריך: {formatDate(answerData.createdAt)}</p>

      <div className={Style.studentInfo}>
        <h2 className={Style.sectionTitle}>מידע על התלמיד:</h2>
        <p>שם: {`${answerData.studentId.first_name} ${answerData.studentId.last_name}`}</p>
      </div>

      <div className={Style.answersSection}>
        <h2 className={Style.sectionTitle}>תשובות:</h2>
        {answerData.answerIds.length > 0 ? (
          answerData.answerIds.map((answer) => {
            const question = questionsMap[answer.questionId];
            return (
              <div key={answer._id} className={Style.answer}>
                <p><strong>שאלה:</strong> {question?.text || "Unknown Question"}</p>
                <p><strong>תיאור שאלה:</strong> {question?.description || "Unknown Question"}</p>
                {question?.type === "scale" && question.scale ? (
                  <p>
                    <strong>שאלה (בטווח {question.scale.min}–{question.scale.max}):</strong> {answer.answerText}
                  </p>
                ) : (
                  <p><strong>תשובה:</strong> {answer.answerText}</p>
                )}

                <p className={Style.answerDate}>זמן מענה: {formatDate(answer.createdAt)}</p>
              </div>
            );
          })
        ) : (
          <p>.אין תשובות זמינות</p>
        )}
      </div>
    </div>
  );
};

export default QuestionnaireAnswerDisplay;
