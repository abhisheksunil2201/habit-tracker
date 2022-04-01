import { useCallback, useEffect, useRef, useState } from "react";

export default function useCountdown({ minutes }) {
  const timerId = useRef(null);
  const time = minutes * 60;
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTime] = useState(time);
  const [running, setRunning] = useState(false);

  const clear = () => {
    clearInterval(timerId.current);
    timerId.current = null;
  };

  const tick = useCallback(() => {
    if (timeLeft > 0) {
      setTime(timeLeft - 1);
      setProgress(((time - timeLeft) / time) * 100);
    }
    if (timeLeft <= 1) {
      setRunning(false);
      clear();
    }
  }, [timeLeft, time]);

  useEffect(() => {
    if (running) {
      timerId.current = setInterval(tick, 1000);
    } else {
      clear();
    }

    return clear;
  }, [tick, running]);

  useEffect(() => {
    setTime(time);
  }, [time]);

  const start = useCallback(() => {
    setRunning(true);
  }, []);

  const stop = useCallback(() => {
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setProgress(0);
  }, []);

  return {
    start,
    stop,
    reset,
    running,
    timeLeft,
    progress: (progress / time) * 100,
  };
}
