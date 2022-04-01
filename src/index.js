import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TimerProvider } from "./contexts/timerContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <TimerProvider>
        <App />
      </TimerProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
