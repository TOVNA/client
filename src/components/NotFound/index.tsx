import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFoundMessage}>העמוד שחיפשת לא קיים</h1>
      <button className={styles.notFoundButton} onClick={handleGoHome}>
        חזרה לדף הבית
      </button>
    </div>
  );
};

export default NotFound;
