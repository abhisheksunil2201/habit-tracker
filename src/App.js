import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Pomodoro } from "./pages/Pomodoro/Pomodoro";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Habits } from "./pages/Habits/Habits";
import { GoogleFit } from "./pages/GoogleFit/GoogleFit";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/gfit" element={<GoogleFit />} />
      </Routes>
    </div>
  );
}

export default App;
