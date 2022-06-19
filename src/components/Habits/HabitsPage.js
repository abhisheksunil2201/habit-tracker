import React, { useState } from "react";
import { useData } from "../../contexts/dataContext";
import styles from "./HabitsPage.module.css";
import { SingleHabit } from "./SingleHabit";

export const HabitsPage = () => {
  const { habits, completedHabits } = useData();
  const [activeTab, setActiveTab] = useState("active");

  const NoHabitsFound = () => (
    <p className={styles.NoHabitsFound}>No habits found</p>
  );

  return (
    <div className={styles.habitsPage}>
      <div className={styles.topBar}>
        <p
          className={[
            styles.topBar__habits,
            activeTab === "active" ? styles.topBar__habitActive : "",
          ].join(" ")}
          onClick={() => setActiveTab("active")}
        >
          Active Habits
        </p>
        <p
          className={[
            styles.topBar__habits,
            activeTab === "completed" ? styles.topBar__habitActive : "",
          ].join(" ")}
          onClick={() => setActiveTab("completed")}
        >
          Completed Habits
        </p>
      </div>
      <div className={styles.mainHabits}>
        {activeTab === "active" && habits.length > 0 ? (
          habits?.map((habit) => <SingleHabit key={habit.id} habit={habit} />)
        ) : activeTab === "active" ? (
          <NoHabitsFound />
        ) : null}
        {activeTab === "completed" && completedHabits.length > 0 ? (
          completedHabits?.map((habit) => (
            <SingleHabit key={habit.id} habit={habit} type="completed" />
          ))
        ) : activeTab === "completed" ? (
          <NoHabitsFound />
        ) : null}
      </div>
    </div>
  );
};
