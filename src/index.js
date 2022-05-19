import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TimerProvider } from "./contexts/timerContext";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./contexts/dataContext";
import { UserProvider } from "./contexts/userContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TimerProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </TimerProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
