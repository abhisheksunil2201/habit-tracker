import { createContext, useContext, useState } from "react";

const defaultValues = {
  mode: "pomodoro",
  round: 1,
  longBreakInterval: 4,
  modes: {
    pomodoro: {
      id: "pomodoro",
      label: "Pomodoro",
      time: 25,
    },
    short_break: {
      id: "short_break",
      label: "Short Break",
      time: 5,
    },
    long_break: {
      id: "long_break",
      label: "Long Break",
      time: 15,
    },
  },
};

const TimerContext = createContext(defaultValues);

const TimerProvider = ({ children }) => {
  const [mode, setMode] = useState("pomodoro");
  const [round, setRound] = useState(1);

  const changeMode = (mode) => setMode(mode);
  const incrementRound = () => setRound((round) => round + 1);
  return (
    <TimerContext.Provider
      value={{ ...defaultValues, mode, changeMode, round, incrementRound }}
    >
      {children}
    </TimerContext.Provider>
  );
};

const useTimer = () => useContext(TimerContext);

export { TimerProvider, useTimer };
