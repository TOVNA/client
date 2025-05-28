import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      {children}
    </div>
  );
};
