import React, { useEffect } from "react";
import { useAuth } from "../../contexts/userContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./GoogleFit.module.css";
import { fetchStepData } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts/dataContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      align: "end",
    },
    title: {
      display: true,
      text: "Steps( Last 7 days )",
    },
  },
  maintainAspectRatio: false,
};

export const GoogleFit = () => {
  const { user, setUser } = useAuth();
  const { resetData } = useData();
  const navigate = useNavigate();
  const [data, setData] = React.useState({ labels: [], datasets: [] });

  useEffect(() => {
    user?.token && fetchStepData(user, setData, setUser, navigate, resetData);
  }, [user]);
  return (
    <div className={styles.googleFit}>
      {console.log(data)}
      <h1 className={styles.googleFit__title}>Google Fit Tracker</h1>
      {user ? (
        data?.datasets[0]?.data ? (
          <div className={styles.chart__container}>
            <Bar options={options} data={data} />
          </div>
        ) : (
          <p className={styles.googleFit__noData}>
            No data is available. Please sync your data with Google Fit and try
            again later.
          </p>
        )
      ) : (
        <p className={styles.googleFit__loginDialog}>
          Please{" "}
          <span
            className={
              styles.googleFit__loginLink + " hover_underline_animation"
            }
            onClick={() => navigate("/login")}
          >
            login
          </span>{" "}
          to track Google Fit data
        </p>
      )}
    </div>
  );
};
