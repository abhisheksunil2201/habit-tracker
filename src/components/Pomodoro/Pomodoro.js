import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import React, { useCallback } from "react";
import { useTimer } from "../../contexts/timerContext";
import styles from "./Pomodoro.module.css";
import useCountdown from "./useCountdown";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import LinearProgress from "@mui/material/LinearProgress";

dayjs.extend(duration);

export const Pomodoro = () => {
  const { mode, modes, round, longBreakInterval, incrementRound, changeMode } =
    useTimer();
  const { running, start, stop, reset, timeLeft, progress } = useCountdown({
    minutes: modes[mode].time,
  });

  const SecondaryButton = ({ children, active, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`${styles.pomodoro__secondaryButton} ${
          active ? styles.pomodoro__secondaryButtonActive : ""
        }`}
      >
        {children}
      </button>
    );
  };

  const NextButton = ({ onClick, className }) => (
    <button onClick={onClick} className={styles.pomodoro__nextButton}>
      <SkipNextIcon
        className={`${styles.pomodoro__nextButtonIcon} ${className}`}
      />
    </button>
  );

  const toggleTimer = useCallback(() => {
    if (running) stop();
    else start();
  }, [start, stop, running]);

  const jumpTo = useCallback(
    (id) => {
      reset();
      changeMode(id);
    },
    [reset, changeMode]
  );

  const next = useCallback(() => {
    switch (mode) {
      case "long_break":
      case "short_break":
        jumpTo("pomodoro");
        break;
      default:
        jumpTo(
          `${round % longBreakInterval !== 0 ? "short_break" : "long_break"}`
        );
        incrementRound();
        break;
    }
  }, [jumpTo, mode, incrementRound, round, longBreakInterval]);

  const confirmAction = useCallback(
    (cb) => {
      let allowed = true;
      if (running) {
        stop();
        allowed = window.confirm(
          "Are you sure you want to finish the round early?"
        );
        start();
      }

      if (allowed) {
        cb();
      }
    },
    [start, stop, running]
  );

  const confirmNext = useCallback(() => {
    confirmAction(next);
  }, [confirmAction, next]);

  const confirmJump = useCallback(
    (id) => {
      confirmAction(() => jumpTo(id));
    },
    [confirmAction, jumpTo]
  );

  const formatTime = (time) => {
    return dayjs.duration(time, "seconds").format("mm:ss");
  };
  console.log(progress);
  return (
    <div className={styles.pomodoro}>
      <LinearProgress
        className={styles.pomodoro__progress}
        variant="determinate"
        value={progress}
      />
      <div className={styles.pomodoro__modes}>
        {Object.values(modes).map(({ id, label }) => (
          <SecondaryButton
            key={id}
            active={id === mode}
            id={id}
            onClick={() => confirmJump(id)}
          >
            {label}
          </SecondaryButton>
        ))}
      </div>
      <p className={styles.pomodoro__time}>{formatTime(timeLeft)}</p>
      <div className={styles.pomodoro__controls}>
        <button className={styles.pomodoro__startBtn} onClick={toggleTimer}>
          {!running ? "START" : "STOP"}
        </button>
        {
          <NextButton
            className={running ? styles.pomodoro__showNextButton : ""}
            onClick={confirmNext}
          />
        }
      </div>
    </div>
  );
};
