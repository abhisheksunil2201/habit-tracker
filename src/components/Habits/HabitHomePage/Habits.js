import React, { useState } from "react";
import styles from "./Habits.module.css";
import { Tooltip, Zoom } from "@mui/material";
import addButton from "../../../assets/add-button.svg";
import { AddHabitModal } from "../../Modal/AddHabitModal";
import { v4 as uuid } from "uuid";
import { useAuth } from "../../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../contexts/dataContext";
import { SingleHabit } from "./SingleHabit";

export const Habits = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { habits } = useData();

  const handleAddHabit = () => {
    if (user) {
      setOpen(true);
    } else {
      navigate("/login");
    }
  };

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
      <AddHabitModal open={open} setOpen={setOpen} />
    </div>
  );
};
