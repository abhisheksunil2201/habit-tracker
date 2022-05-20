import { Zoom } from "@mui/material";
import React from "react";
import styles from "./Navbar.module.css";
import coinIcon from "../../assets/coin.svg";
import { Login, Logout } from "@mui/icons-material";
import logo from "../../assets/unicorn.png";
import { Tooltip } from "../utils/tooltip";
import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts/dataContext";
import { useAuth } from "../../contexts/userContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { coins } = useData();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__left} onClick={() => navigate("/")}>
        <img className={styles.navbar__logoImg} src={logo} alt="habitica" />
        <p className={styles.navbar__logoTitle}>Habitica</p>
      </div>
      <div className={styles.navbar__right}>
        {user && (
          <div className={styles.navbar__gold}>
            <Tooltip TransitionComponent={Zoom} title="Gold">
              <img
                className={styles.navbar__goldIcon}
                src={coinIcon}
                alt="gold"
              />
            </Tooltip>
            <p>{coins}</p>
          </div>
        )}
        {!user && (
          <Tooltip TransitionComponent={Zoom} title="Login">
            <Login
              onClick={() => navigate("/login")}
              className={styles.navbar__logIcon}
            />
          </Tooltip>
        )}
        {user && (
          <Tooltip TransitionComponent={Zoom} title="Logout">
            <Logout onClick={handleLogout} className={styles.navbar__logIcon} />
          </Tooltip>
        )}
      </div>
    </div>
  );
};
