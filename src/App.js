import { Route, Routes, useLocation } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Pomodoro } from "./pages/Pomodoro/Pomodoro";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Habits } from "./pages/Habits/Habits";
import { GoogleFit } from "./pages/GoogleFit/GoogleFit";
import { useEffect } from "react";
import { useAuth } from "./contexts/userContext";

function App() {
  const location = useLocation();
  const { user } = useAuth();
  useEffect(() => {
    console.log("User activity");
  }, [user]);
  return (
    <div className="App">
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/pomodoro" element={<Pomodoro />} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/habits" element={<Habits />} />
        </Route>
        <Route exact path="/gfit" element={<GoogleFit />} />
      </Routes>
    </div>
  );
}

export default App;
