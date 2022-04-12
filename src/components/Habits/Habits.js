import React from "react";
import styles from "./Habits.module.css";
import { Tooltip, Zoom } from "@mui/material";
import addButton from "../../assets/add-button.svg";

export const Habits = () => {
  return (
    <div className={styles.habits}>
      <Tooltip TransitionComponent={Zoom} title="Add habit">
        <img className={styles.addHabitBtn} src={addButton} alt="addHabit" />
      </Tooltip>
      <div className={styles.habitContainer}>
        <p className={styles.habitHeading}>Habits</p>
        <div className={styles.habitsList}>
          <p className={styles.habit}>Cooking</p>
          <p className={styles.habit}>Cooking</p>
          <p className={styles.habit}>Cooking</p>
          <p className={styles.habit}>Cooking</p>
          <p className={styles.habit}>
            Get the assignment done as soon as possible long habit test
          </p>
        </div>
      </div>
    </div>
  );
};
