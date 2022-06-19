import React, { useEffect, useState } from "react";
import { Check } from "@mui/icons-material";
import styles from "./Habits.module.css";
import { useData } from "../../../contexts/dataContext";

export const SingleHabit = ({ habit }) => {
  const { habitCompletedOnce, getTodayProgress } = useData();
  const [progress, setProgress] = useState(0);

  const handleHabitComplete = (id, currentProgress) => {
    if (currentProgress < habit.goal) {
      habitCompletedOnce(id, currentProgress);
      getProgress();
    }
  };

  const getProgress = async () => {
    const progress = await getTodayProgress(habit.id);
    progress && setProgress(progress);
  };

  useEffect(() => {
    getProgress();
    return () => {
      setProgress(0);
    };
  }, []);

  return (
    <div className={styles.singleHabit}>
      <p className={styles.singleHabit__name}>{habit.habit}</p>
      <p className={styles.singleHabit__frequency}>
        {progress}/{habit.goal} times today
      </p>
      <div
        style={{
          cursor: progress < habit.goal ? "pointer" : "not-allowed",
        }}
      >
        <Check
          style={{
            cursor: progress < habit.goal ? "pointer" : "not-allowed",
            pointerEvents: progress < habit.goal ? "auto" : "none",
          }}
          onClick={() => handleHabitComplete(habit.id, progress)}
        />
      </div>
    </div>
  );
};
