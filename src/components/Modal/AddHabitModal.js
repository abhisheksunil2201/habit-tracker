import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import styles from "./AddHabitModal.module.css";

export const AddHabitModal = ({ open, setOpen, habits, setHabits }) => {
  const [habit, setHabit] = useState("");
  const handleClose = () => setOpen(false);
  const handleAddHabit = () => {
    setHabits([...habits, habit]);
    handleClose();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={styles.addHabitModal}>
          <p className={styles.addHabitModal__heading}>Add a Habit</p>
          <input
            type="text"
            className={styles.addHabitModal__input}
            placeholder="Add habit eg. Cook"
            value={habit}
            onChange={(e) => setHabit(e.target.value)}
          />
          <button
            className={styles.addHabitModal__button}
            onClick={handleAddHabit}
          >
            Add habit
          </button>
        </div>
      </Fade>
    </Modal>
  );
};
