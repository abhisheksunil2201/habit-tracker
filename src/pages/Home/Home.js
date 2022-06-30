import React from "react";
import { Habits } from "../../components/Habits/HabitHomePage/Habits";
import { Quotes } from "../../components/Quotes/Quotes";
import styles from "./Home.module.css";
import googleFitIcon from "../../assets/google-fit.svg";
import stopwatchIcon from "../../assets/stopwatch.svg";
import { useNavigate } from "react-router-dom";
import { Stats } from "../../components/Stats/Stats";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <div className={styles.home__left}>
        <Habits />
      </div>
      <div className={styles.home__mid}>
        <div
          className={styles.home__pomodoro}
          style={{ backgroundImage: `url(${stopwatchIcon})` }}
          onClick={() => navigate("/pomodoro")}
        >
          <p>Pomodoro</p>
        </div>
        <Quotes />
      </div>
      <div className={styles.home__right}>
        <Stats />
        <div
          className={styles.home__googleFit}
          onClick={() => navigate("/gfit")}
        >
          <img
            className={styles.googleFitIcon}
            src={googleFitIcon}
            alt="Google Fit"
          />
          <p>
            Track your Google <span className="lightFont">Fit</span> data
          </p>
        </div>
      </div>
    </div>
  );
};
