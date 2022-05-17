import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Pomodoro } from "./components/Pomodoro/Pomodoro";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
      </Routes>
    </div>
  );
}

export default App;
