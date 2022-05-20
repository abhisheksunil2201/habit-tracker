import React, { forwardRef, useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import styles from "./AddHabitModal.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InputLabel, MenuItem, Select } from "@mui/material";

export const AddHabitModal = ({ open, setOpen, habits, setHabits }) => {
  const [habit, setHabit] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [goal, setGoal] = useState(1);
  const handleClose = () => setOpen(false);
  const handleAddHabit = () => {
    setHabits([...habits, habit]);
    handleClose();
  };

  const DateCustomInput = forwardRef(({ value, title, onClick }, ref) => (
    <div className={styles.customDate}>
      <p>{title}</p>
      <button
        className={styles.customDateButton}
        style={{ margin: "0.5rem 0" }}
        onClick={onClick}
        ref={ref}
      >
        {value}
      </button>
    </div>
  ));

  const SelectCustomInput = ({ labelId, inputId, value, onChange }) => (
    <>
      <InputLabel
        id="goal-select-label"
        style={{
          color: "white",
          fontWeight: "200",
          fontSize: "1.2rem",
          marginTop: "1rem",
        }}
      >
        Goal
      </InputLabel>
      <Select
        labelId="goal-select-label"
        id="goal-select"
        style={{
          color: "gray",
          border: "1px solid black",
          background: "black",
          textAlign: "center",
        }}
        value={goal}
        label="Age"
        onChange={() => setGoal(goal)}
      >
        <MenuItem value={1}>1 times</MenuItem>
        <MenuItem value={2}>2 times</MenuItem>
      </Select>
    </>
  );

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
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<DateCustomInput />}
            title="Start Date"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            customInput={<DateCustomInput />}
            title="End Date"
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
