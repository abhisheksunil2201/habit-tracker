import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TimerProvider } from "./contexts/timerContext";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./contexts/dataContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <TimerProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </TimerProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
