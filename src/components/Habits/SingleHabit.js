import { format } from "date-fns";
import React from "react";
import styles from "./SingleHabit.module.css";
import { Delete } from "@mui/icons-material";
import { useData } from "../../contexts/dataContext";

export const SingleHabit = ({ habit, type }) => {
  const { deleteHabit } = useData();

  const getDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);

    return format(date, "MMM dd, yyyy");
  };

  const handleDelete = (habit) => {
    if (
      window.confirm(
        `Are you sure you want to delete the habit "${habit.habit}"`
      )
    ) {
      deleteHabit(habit);
    }
  };

  return (
    <div key={habit.id} className={styles.singleHabit}>
      <p className={styles.singleHabit__name}>{habit.habit}</p>
      <div className={styles.singleHabit__subContainer}>
        <p className={styles.singleHabit__frequency}>
          Frequency: {habit.frequency}
        </p>
        <p className={styles.singleHabit__goal}>
          Goal: {habit.goal} times every day
        </p>
      </div>
      <div className={styles.singleHabit__subContainer}>
        <p className={styles.singleHabit__startDate}>
          Start date : {getDate(habit.startDate)}
        </p>
        <p className={styles.singleHabit__endDate}>
          End date : {getDate(habit.endDate)}
        </p>
      </div>
      {type !== "completed" && (
        <p className={styles.singleHabit__delete}>
          <Delete
            onClick={() => handleDelete(habit)}
            className={styles.singleHabit__deleteIcon}
          />
        </p>
      )}
    </div>
  );
};
