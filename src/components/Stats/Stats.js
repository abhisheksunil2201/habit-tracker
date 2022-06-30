import React from "react";
import styles from "./Stats.module.css";
import { useData } from "../../contexts/dataContext";
import { ArrowCircleRight } from "@mui/icons-material";
import { Snackbar } from "@mui/material";

export const Stats = () => {
  const { streak } = useData();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.stats}>
      <p className={styles.stats__heading}>Stats</p>
      <div className={styles.stats__info}>
        <p>Current streak : {streak.currentStreak}</p>
        <p>Longest streak : {streak.longestStreak}</p>
        <div
          className={[
            styles.stats__viewDetailedInfo,
            styles.hover_underline_animation,
          ].join(" ")}
          onClick={() => setOpen(true)}
        >
          <p>View detailed stats</p>
          <ArrowCircleRight />
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <div className={styles.toast__message} onClose={handleClose}>
          This feature is coming soon!
        </div>
      </Snackbar>
    </div>
  );
};
