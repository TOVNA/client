import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import ClassIcon from "../../assets/class.svg";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const data = [
    { _id: 1, name: "אולפנה" },
    { _id: 2, name: "תיכון" },
  ];

  return (
    <>
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
            {data.map(({ _id, name }) => (
              <div key={_id} className={styles.item}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
