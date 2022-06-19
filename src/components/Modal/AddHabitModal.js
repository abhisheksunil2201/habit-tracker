import React, { forwardRef, useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import styles from "./AddHabitModal.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { addDays } from "date-fns";

export const AddHabitModal = ({ open, setOpen, habits, addHabit }) => {
  const [habit, setHabit] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [goal, setGoal] = useState(1);
  const [frequency, setFrequency] = useState("daily");

  const handleClose = () => {
    setHabit("");
    setStartDate(new Date());
    setEndDate(new Date());
    setGoal(1);
    setFrequency("daily");
    setOpen(false);
  };
  const handleAddHabit = () => {
    const newHabit = { habit, startDate, endDate, goal, frequency };
    addHabit(newHabit);
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

  const SelectCustomInput = ({
    label,
    labelId,
    inputId,
    value,
    onChange,
    menuItems,
  }) => (
    <>
      <InputLabel
        id={labelId}
        style={{
          color: "white",
          fontWeight: "200",
          fontSize: "1.2rem",
          marginTop: "1rem",
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        id={inputId}
        style={{
          color: "gray",
          border: "1px solid black",
          background: "black",
          textAlign: "center",
        }}
        value={value}
        label="Age"
        onChange={onChange}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.title}
          </MenuItem>
        ))}
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
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setStartDate(date)}
            placeholder="Start Date"
            minDate={new Date()}
            customInput={<DateCustomInput />}
            title="Start Date"
          />
          <DatePicker
            selected={endDate}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setEndDate(date)}
            placeholder="End Date"
            minDate={addDays(startDate, 1)}
            customInput={<DateCustomInput />}
            title="End Date"
          />
          <SelectCustomInput
            label="Goal"
            labelId="goal-select-label"
            inputId="goal-select"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            menuItems={[
              { value: 1, title: "1 time" },
              { value: 2, title: "2 times" },
            ]}
          />
          <SelectCustomInput
            label="Repeat"
            labelId="frequency-select-label"
            inputId="frequency-select"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            menuItems={[
              { value: "daily", title: "Daily" },
              { value: "weekly", title: "Weekly" },
              { value: "monthly", title: "Monthly" },
            ]}
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
