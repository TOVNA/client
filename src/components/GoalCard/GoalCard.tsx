import React from "react";
import styles from "./GoalCard.module.css";
import { Goal } from "../../types/entities/goal";
import { useStrategiesByGoal } from "../../utils/customHooks/queries/useStrategiesByGoal";
import editIcon from "../../assets/bluePencil.svg";
import { useNavigate } from "react-router-dom";

interface CardProps {
  goal: Goal;
}

export const GoalCard: React.FC<CardProps> = ({ goal }) => {
  const { data: strategies } = useStrategiesByGoal(goal._id);
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <img
        src={editIcon}
        className={styles.editButton}
        onClick={() => navigate(`goal/${goal._id}`)}
      />
      <div>המטרה: {goal.text}</div>
      <div>
        תאריך יצירה: {new Date(goal.createdAt).toLocaleDateString("he-IL")}
      </div>
      <div>מקור: {goal.generatedByAI ? "אוטומטי" : "ידני"}</div>
      {strategies && (
        <ol>
          {strategies.map((strategy) => (
            <li>{strategy.text}</li>
          ))}
        </ol>
      )}
    </div>
  );
};
