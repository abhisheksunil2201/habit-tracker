import React from "react";
import styles from "./Home.module.css";
import { Tooltip, Zoom } from "@mui/material";
import addButton from "../../assets/add-button.svg";

export const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.habits}>
        <Tooltip TransitionComponent={Zoom} title="Add habit">
          <img className={styles.addHabitBtn} src={addButton} alt="addHabit" />
        </Tooltip>
        <p className={styles.habitHeading}>Habits</p>
        <div className={styles.habitContainer}>
          <p>Cooking</p>
          <p>Cooking</p>
          <p>Cooking</p>
          <p>Cooking</p>
        </div>
      </div>
      <div className={styles.mid}></div>
      <div className={styles.end}></div>
    </div>
  );
};
