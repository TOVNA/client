import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import ClassIcon from "../../assets/class.svg";
import { useSelectedClassId } from "../SelectedClassContext/SelectedClassContext";
import { useClasses } from "../../utils/customHooks/queries/useClasses";
import { Class } from "../../types/entities/class";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { selectedClassId, setSelectedClassId } = useSelectedClassId();
  const { data: classes = [] } = useClasses();

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
          {(classes as Class[]).map(({ _id, grade }) => (
            <div
              key={_id}
              className={`${styles.item} ${
                _id === selectedClassId ? styles.selected : ""
              }`}
              onClick={() => setSelectedClassId(_id)}
            >
              {grade}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
