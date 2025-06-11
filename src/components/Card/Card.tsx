import React from "react";
import styles from "./Card.module.css";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, ...rest }) => {
  return (
    <div className={styles.card} {...rest}>
      {children}
    </div>
  );
};
