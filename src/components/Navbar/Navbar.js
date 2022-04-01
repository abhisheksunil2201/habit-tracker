import { Zoom } from "@mui/material";
import React from "react";
import styles from "./Navbar.module.css";
import coinIcon from "../../assets/coin.svg";
import { PersonOutlined } from "@mui/icons-material";
import logo from "../../assets/unicorn.png";
import { Tooltip } from "../utils/tooltip";

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__left}>
        <img
          className={styles.navbar__logoImg}
          // src="https://habitica.com/static/img/melior@3x.fe3b187f.png"
          src={logo}
          alt="habitica"
        />
        <p className={styles.navbar__logoTitle}>Habitica</p>
      </div>
      <div className={styles.navbar__right}>
        <div className={styles.navbar__gold}>
          <Tooltip TransitionComponent={Zoom} title="Gold">
            <img
              className={styles.navbar__goldIcon}
              src={coinIcon}
              alt="gold"
            />
          </Tooltip>
          <p>9999</p>
        </div>
        <Tooltip TransitionComponent={Zoom} title="User">
          <PersonOutlined className={styles.navbar__userIcon} />
        </Tooltip>
      </div>
    </div>
  );
};
