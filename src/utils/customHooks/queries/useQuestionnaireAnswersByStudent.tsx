import { useEffect, useState } from "react";

export interface QuestionnaireAnswer {
  _id: string;
  createdAt: string;
  questionnaireId: string;
}

export const useQuestionnaireAnswers = (studentId: string) => {
  const [answers, setAnswers] = useState<QuestionnaireAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) return;

    const fetchAnswers = async () => {
      try {
        const res = await fetch(`/questionnaire-answer/by-student/${studentId}`);
        if (!res.ok) throw new Error("Failed to fetch questionnaire answers.");
        const data = await res.json();
        setAnswers(data);
      } catch (err) {
        console.error(err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [studentId]);

  return { answers, loading, error };
};
