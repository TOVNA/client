import { Question as IQuestion } from "../../types/entities/question";
import styles from "./Question.module.css";

interface QuestionProps {
  question: IQuestion;
  isEditable: boolean;
  answer: string;
  onAnswerChange?: (newAnswer: string) => void;
  error?: string;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  isEditable,
  answer,
  onAnswerChange,
  error,
}) => {
  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onAnswerChange?.(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{question.text}</h3>
      <p>{question.description}</p>
      <div>
        <label>תשובה:</label>
        {
          <textarea
            value={answer}
            disabled={!isEditable}
            onChange={handleAnswerChange}
            className={`${styles.textarea} ${
              error ? styles.textareaError : ""
            }`}
            rows={4}
          />
        }
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
};
