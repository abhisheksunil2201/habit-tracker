import React, { useEffect, useState } from "react";
import { useData } from "../../../contexts/dataContext";
import styles from "./HabitsPage.module.css";
import { SingleHabit } from "./SingleHabit";

export const HabitsPage = () => {
  const {
    habits,
    deletedHabits,
    activeHabits,
    completedHabits,
    setActiveHabits,
    setCompletedHabits,
  } = useData();
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    setActiveHabits(habits.filter((habit) => habit.progress !== habit.goal));
    setCompletedHabits(habits.filter((habit) => habit.progress === habit.goal));
  }, [habits]);

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
        <p
          className={[
            styles.topBar__habits,
            activeTab === "deleted" ? styles.topBar__habitActive : "",
          ].join(" ")}
          onClick={() => setActiveTab("deleted")}
        >
          Deleted Habits
        </p>
      </div>
      <div className={styles.mainHabits}>
        {activeTab === "active" && activeHabits.length > 0 ? (
          activeHabits?.map((habit) => (
            <SingleHabit key={habit.id} habit={habit} type="active" />
          ))
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
        {activeTab === "deleted" && deletedHabits.length > 0 ? (
          deletedHabits?.map((habit) => (
            <SingleHabit key={habit.id} habit={habit} type="deleted" />
          ))
        ) : activeTab === "deleted" ? (
          <NoHabitsFound />
        ) : null}
      </div>
    </div>
  );
};
