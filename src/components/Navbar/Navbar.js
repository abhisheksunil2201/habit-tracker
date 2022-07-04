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
import { logoutHandler } from "../../utils/functions";

export const Navbar = () => {
  const navigate = useNavigate();
  const { coins, resetData } = useData();
  const { user, setUser } = useAuth();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__left} onClick={() => navigate("/")}>
        <img className={styles.navbar__logoImg} src={logo} alt="habitica" />
        <p className={styles.navbar__logoTitle}>Habitica</p>
      </div>
      <div className={styles.navbar__right}>
        {user && (
          <>
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
            <div className={styles.navbar__userImage}>
              <Tooltip
                TransitionComponent={Zoom}
                title={user?.user?.displayName}
              >
                <img
                  className={styles.navbar__userIcon}
                  src={user?.user?.photoURL}
                  alt="gold"
                />
              </Tooltip>
            </div>
          </>
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
            <Logout
              onClick={() => logoutHandler(setUser, navigate, resetData)}
              className={styles.navbar__logIcon}
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};
