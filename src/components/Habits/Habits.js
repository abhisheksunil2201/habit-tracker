import React, { useState } from "react";
import styles from "./Habits.module.css";
import { Tooltip, Zoom } from "@mui/material";
import addButton from "../../assets/add-button.svg";
import { AddHabitModal } from "../Modal/AddHabitModal";
import { v4 as uuid } from "uuid";
import { useAuth } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { Check } from "@mui/icons-material";

export const Habits = () => {
  const [habits, setHabits] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log("Habits are", habits);

  const handleAddHabit = () => {
    if (user) {
      setOpen(true);
    } else {
      navigate("/login");
    }
  };

  const handleHabitComplete = () => {
    console.log("Habit done once");
  };

  const SingleHabit = ({ habit }) => (
    <div className={styles.singleHabit}>
      <p className={styles.singleHabit__name}>{habit.habit}</p>
      <p className={styles.singleHabit__frequency}>0/2 times today</p>
      <Check style={{ cursor: "pointer" }} onClick={handleHabitComplete} />
    </div>
  );

  return (
    <div className={styles.habits}>
      <Tooltip
        TransitionComponent={Zoom}
        title={user ? "Add habit" : "Login to add habit"}
      >
        <img
          className={styles.addHabitBtn}
          src={addButton}
          alt="addHabit"
          onClick={() => handleAddHabit()}
        />
      </Tooltip>
      <div className={styles.habitContainer}>
        <span
          className={styles.habitHeading}
          onClick={() => navigate("/habits")}
        >
          Habits
        </span>
        <div className={styles.habitsList}>
          {habits.length === 0 && (
            <p className={styles.habit__info}>
              These are your habits. You can add a new habit by clicking on +{" "}
            </p>
          )}
          {habits.length > 0 &&
            habits.map((habit) => <SingleHabit key={uuid()} habit={habit} />)}
        </div>
      </div>
      <AddHabitModal
        open={open}
        setOpen={setOpen}
        habits={habits}
        setHabits={setHabits}
      />
    </div>
  );
};
