import styles from "./AdminSidebar.module.css";
import { useNavigate } from "react-router";

const options = [
  { label: "מורים", value: "teachers" },
  { label: "תלמידים", value: "students" },
  { label: "כיתות", value: "classes" },
  { label: "מורים מקצועיים", value: "class-subjects" },
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleOptionClick = (value: string) => {
    navigate(`/admin/${value}`);
  };

  return (
    <div className={styles.sidebar}>
      {options.map((option) => (
        <button
          key={option.value}
          className={styles.sectionButton}
          onClick={() => handleOptionClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default AdminSidebar;
