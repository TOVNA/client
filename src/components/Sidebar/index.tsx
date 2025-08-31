import { useMemo, useState } from "react";
import styles from "./Sidebar.module.css";
import ClassIcon from "../../assets/class.svg";
import { useSelectedClassId } from "../SelectedClassContext/SelectedClassContext";
import { useSelectedStudentId } from "../SelectedStudentContext/SelectedStudentContext";
import { useNavigate } from "react-router-dom";
import { useClassSubject } from "../../utils/customHooks/queries/useClassSubject";
import { useAuth } from "../AuthContext";
import { useHomeroomClasses } from "../../utils/customHooks/queries/useHomeroomClasses";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { selectedUniqueId, setSelectedClassData } = useSelectedClassId();
  const { setSelectedStudentId } = useSelectedStudentId();
  const { user } = useAuth();
  const { data: subjectClasses = [] } = useClassSubject(user?._id);
  const { data: homeroomClasses = [] } = useHomeroomClasses(user?._id);
  const navigate = useNavigate();

  const classesMenu = useMemo(() => {
    const subjectClassesMenu = subjectClasses?.map((c) => ({
      classId: c?.classId?._id as string,
      uniqueId: `subject-${c._id}`,
      label: `${c.classId?.grade} - ${c.subject}`,
    }));

    const homeroomClassesMenu = homeroomClasses?.map((c) => ({
      classId: c._id as string,
      uniqueId: `homeroom-${c._id}`,
      label: c.grade,
    }));

    return [...subjectClassesMenu, ...homeroomClassesMenu];
  }, [subjectClasses, homeroomClasses]);

  return (
    <div className={styles.sidebar}>
      <div>
        <button
          className={styles.sectionButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <img src={ClassIcon} alt="class icon" />
          כיתות
        </button>
        <div
          className={`${styles.sectionContent} ${
            isExpanded ? styles.sectionContentOpen : ""
          }`}
        >
          {(classesMenu).map(({ classId, uniqueId, label }) => (
            <div
              key={uniqueId}
              className={`${styles.item} ${
                uniqueId === selectedUniqueId ? styles.selected : ""
              }`}
              onClick={() => {
                setSelectedClassData({ uniqueId, classId, label });
                setSelectedStudentId(undefined);
                navigate("/");
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
