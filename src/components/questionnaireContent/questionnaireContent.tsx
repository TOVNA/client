import React, { useState, useEffect } from 'react';
// import { format } from 'date-fns';  // Removed date-fns
// import { he } from 'date-fns/locale';
import Style from "./QuestionnaireAnswerPage.module.css";

interface QuestionnaireAnswer {
  questionnaireId: {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
  };
  teacherId: {
    _id: string;
  };
  studentId: {
    _id: string;
    first_name: string;
    last_name: string;
  };
  answerIds: {
    _id: string;
    questionId: string;
    answerText: string;
    createdAt: string;
  }[];
  _id: string;
  createdAt: string;
}

// Mock fetch function (replace with your actual API call)
const fetchQuestionnaireAnswer = async (id: string): Promise<QuestionnaireAnswer> => {
  // Simulate API call delay
  //await new Promise(resolve => setTimeout(resolve, 500));

  // Mock API response (replace with your actual API response)
  const mockResponse: QuestionnaireAnswer = {
    questionnaireId: {
      _id: "681f7110db710d27f8cd7b53",
      title: "שאלון מחנך",
      description: "תאר/י את מצב התלמיד/ה בנושאים הבאים",
      createdAt: "2025-05-10T12:29:24.796Z",
    },
    teacherId: {
      _id: "68011d24a9bf592efa75afd2",
    },
    studentId: {
      _id: "67e96a5ab44eec9381316ccd",
      first_name: "עמית",
      last_name: "אבישר",
    },
    answerIds: [
      {
        _id: "6829de1461cc4c0f53abb7c6",
        questionId: "681f7391db710d27f8cd7b61",
        answerText: "תשובה 1",
        createdAt: "2025-05-18T13:18:12.268Z",
      },
      {
        _id: "6829de1461cc4c0f53abb7c7",
        questionId: "681f7391db710d27f8cd7b62",
        answerText: "תשובה 2",
        createdAt: "2025-05-18T13:18:12.269Z",
      },
    ],
    _id: "6829de1461cc4c0f53abb7c4",
    createdAt: "2025-05-18T13:18:12.183Z",
  };
  return mockResponse;
};

const QuestionnaireAnswerDisplay = () => {
  const [answerData, setAnswerData] = useState<QuestionnaireAnswer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const id = "6829c4e3665390cfb71535da";

  // Simple date formatting function (for demonstration)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuestionnaireAnswer(id);
        setAnswerData(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch questionnaire answer data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading questionnaire answer data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!answerData) {
    return (
      <div className="flex justify-center items-center h-screen">
        No data found for this questionnaire answer ID.
      </div>
    );
  }

  return (
    <div className={Style.questionnaireAnswerDisplay}>
      <h1 className={Style.questionnaireTitle}>
        {answerData ? answerData.questionnaireId.title : "No Title"}
      </h1>
      <p className={Style.questionnaireDescription}>
        {answerData ? answerData.questionnaireId.description : "No Description"}
      </p>
      <p className={Style.questionnaireDate}>
        Created At: {answerData ? formatDate(answerData.questionnaireId.createdAt) : "No Date"}
      </p>

      <div className={Style.studentInfo}>
        <h2 className={Style.sectionTitle}>Student Information:</h2>
        <p>
          Name: {answerData ? `${answerData.studentId.first_name} ${answerData.studentId.last_name}` : "No Name"}
        </p>
      </div>

      <div className={Style.answersSection}>
        <h2 className={Style.sectionTitle}>Answers:</h2>
        {answerData.answerIds.length > 0 ? (
          answerData.answerIds.map((answer) => (
            <div key={answer._id} className={Style.answer}>
              <p>
                Question ID: {answer.questionId}
              </p>
              <p>
                Answer: {answer.answerText}
              </p>
              <p className={Style.answerDate}>
                Answered At: {formatDate(answer.createdAt)}
              </p>
            </div>
          ))
        ) : (
          <p>No answers available.</p>
        )}
      </div>
      <p className={Style.questionnaireCreatedAt}>
        Questionnaire Answered At: {answerData ? formatDate(answerData.createdAt) : "No Date"}
      </p>
    </div>
  );
};

export default QuestionnaireAnswerDisplay;

