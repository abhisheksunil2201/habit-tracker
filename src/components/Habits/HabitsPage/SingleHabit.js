import { format } from "date-fns";
import React, { useState } from "react";
import styles from "./SingleHabit.module.css";
import { Delete, Edit } from "@mui/icons-material";
import { useData } from "../../../contexts/dataContext";
import { AddHabitModal } from "../../Modal/AddHabitModal";

export const SingleHabit = ({ habit, type }) => {
  const { deleteHabit } = useData();
  const [open, setOpen] = useState(false);

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

  const handleEdit = () => {
    setOpen(true);
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
        {type !== "deleted" && (
          <p className={styles.singleHabit__endDate}>
            Today's progess : {habit.progress}/{habit.goal}
          </p>
        )}
      </div>
      {type !== "deleted" && (
        <div className={styles.singleHabit__iconContainer}>
          <div>
            <Edit
              onClick={() => handleEdit(habit)}
              className={styles.singleHabit__icon}
            />
          </div>
          <div>
            <Delete
              onClick={() => handleDelete(habit)}
              className={styles.singleHabit__icon}
            />
          </div>
        </div>
      )}
      <AddHabitModal
        open={open}
        setOpen={setOpen}
        type="edit"
        id={habit.id}
        habit={habit}
      />
    </div>
  );
};
