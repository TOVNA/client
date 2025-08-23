import React from "react";
import styles from "./FullScreenMessage.module.css";

interface FullScreenMessageProps {
  title: string;
  message?: string;
}

const FullScreenMessage: React.FC<FullScreenMessageProps> = ({
  title,
  message,
}) => {
  return (
    <div className={styles.fullScreenMessage}>
      <div>{title}</div>
      <div>{message}</div>
    </div>
  );
};

export default FullScreenMessage;
