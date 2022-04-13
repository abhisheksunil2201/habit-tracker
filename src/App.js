import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Pomodoro } from "./components/Pomodoro/Pomodoro";
import { db } from "./firebase";
import { Home } from "./pages/Home/Home";
import { collection, getDocs } from "firebase/firestore/lite";

function App() {
  useEffect(() => {
    async function getQuotes() {
      const quotesCol = collection(db, "quotes");
      const quotesSnapshot = await getDocs(quotesCol);
      const quotesList = quotesSnapshot.docs.map((doc) => doc.data());
      return quotesList;
    }
    getQuotes().then((data) => console.log("Firebase data is", data));
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
      </Routes>
    </div>
  );
}

export default App;
