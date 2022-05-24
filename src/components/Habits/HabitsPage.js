import React from "react";
import styles from "./HabitsPage.module.css";

export const HabitsPage = () => {
  return (
    <div className={styles.habitsPage}>
      <div className={styles.sidebar}>
        <p className={styles.sidebar__habits}>Active Habits</p>
        <p className={styles.sidebar__habits}>Archieved Habits</p>
        <p className={styles.sidebar__habits}>Deleted Habits</p>
      </div>
      <div className={styles.mainHabits}>Main</div>
    </div>
  );
};
