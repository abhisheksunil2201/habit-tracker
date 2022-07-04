import React, { useEffect } from "react";
import logo from "../../assets/unicorn.png";
import styles from "./Login.module.css";
import { useAuth } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { loginHandler } from "../../utils/functions";
import { googleSvg, habiticaSvg } from "../../utils/svgs";

export const Login = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    user && navigate("/");
  }, [user, navigate]);

  return (
    <div className={styles.login}>
      <img
        className={styles.habiticaLogo}
        src={logo}
        alt="habitica"
        onClick={() => navigate("/")}
      />
      {habiticaSvg(styles)}
      <button
        className={styles.login__button}
        onClick={() => loginHandler(setUser)}
      >
        {googleSvg(styles)} Log In with Google
      </button>
    </div>
  );
};
