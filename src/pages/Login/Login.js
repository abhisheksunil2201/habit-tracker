import React, { useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import logo from "../../assets/unicorn.png";
import styles from "./Login.module.css";
import { useAuth } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const provider = new GoogleAuthProvider();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    user && navigate("/");
  });

  const loginHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        localStorage.setItem("user", JSON.stringify({ user, token }));
        setUser({ user, token });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const habiticaSvg = (
    <svg
      className={styles.habiticaSvg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 144 31"
    >
      <g fill="none" fillRule="evenodd">
        <path
          fill="#FFF"
          d="M120.876 24.007a2.27 2.27 0 0 0-3.183.41 4.595 4.595 0 0 1-3.663 1.804 4.62 4.62 0 0 1-4.613-4.335c-.005-.35-.009-2.864-.009-3.19a4.627 4.627 0 0 1 4.622-4.622c1.28 0 2.47.51 3.353 1.44a2.269 2.269 0 0 0 3.29-3.125 9.2 9.2 0 0 0-6.643-2.853c-5.05 0-9.16 4.109-9.16 9.16 0 .03.002 3.175.014 3.406a9.158 9.158 0 0 0 9.146 8.657 9.1 9.1 0 0 0 7.257-3.57 2.27 2.27 0 0 0-.411-3.182m13.497 2.214a4.62 4.62 0 0 1-4.613-4.333c-.005-.353-.008-2.877-.008-3.193a4.627 4.627 0 0 1 4.621-4.622 4.627 4.627 0 0 1 4.622 4.622c0 .328-.003 2.84-.009 3.189a4.618 4.618 0 0 1-4.613 4.337m6.891-17.078a2.264 2.264 0 0 0-2.19 1.706 9.095 9.095 0 0 0-4.7-1.313c-5.051 0-9.16 4.109-9.16 9.16 0 .031.001 3.173.013 3.406a9.158 9.158 0 0 0 9.146 8.657 9.118 9.118 0 0 0 4.81-1.37 2.268 2.268 0 0 0 4.35-.899V11.412a2.27 2.27 0 0 0-2.269-2.269M30.546 26.221a4.62 4.62 0 0 1-4.613-4.335c-.006-.35-.01-2.863-.01-3.19a4.627 4.627 0 0 1 4.623-4.623 4.627 4.627 0 0 1 4.622 4.622c0 .328-.004 2.84-.01 3.189a4.618 4.618 0 0 1-4.612 4.337m6.89-17.078a2.264 2.264 0 0 0-2.19 1.706 9.095 9.095 0 0 0-4.7-1.313c-5.052 0-9.16 4.109-9.16 9.16 0 .031 0 3.174.013 3.406a9.158 9.158 0 0 0 9.147 8.657 9.118 9.118 0 0 0 4.809-1.37 2.268 2.268 0 0 0 4.35-.899V11.412a2.27 2.27 0 0 0-2.269-2.269m33.404 0a2.27 2.27 0 0 0-2.27 2.27V28.49a2.27 2.27 0 0 0 4.539 0V11.412a2.27 2.27 0 0 0-2.27-2.269m26.724 0a2.27 2.27 0 0 0-2.27 2.27V28.49a2.27 2.27 0 0 0 4.538 0V11.412a2.27 2.27 0 0 0-2.268-2.269M59.066 21.888a4.62 4.62 0 0 1-4.613 4.333 4.62 4.62 0 0 1-4.613-4.338c-.006-.35-.009-2.86-.009-3.187a4.627 4.627 0 0 1 4.622-4.622 4.627 4.627 0 0 1 4.622 4.622c0 .315-.004 2.84-.009 3.192M54.453 9.536a9.089 9.089 0 0 0-4.622 1.265V2.33a2.27 2.27 0 0 0-4.537 0v26.16a2.269 2.269 0 0 0 4.35.9 9.117 9.117 0 0 0 4.81 1.37 9.16 9.16 0 0 0 9.146-8.666c.011-.224.013-3.367.013-3.398 0-5.052-4.11-9.16-9.16-9.16m-45.533 0a9.143 9.143 0 0 0-4.382 1.11V2.33A2.27 2.27 0 0 0 0 2.33v26.16a2.269 2.269 0 1 0 4.538 0V16.763c.173-.147.333-.314.46-.516a4.601 4.601 0 0 1 3.921-2.173 4.627 4.627 0 0 1 4.622 4.622c0 .415-.004 9.233-.01 9.738a2.27 2.27 0 0 0 4.535.172c.01-.225.012-9.814.012-9.91 0-5.052-4.108-9.16-9.159-9.16m80.031-.393h-2.648V2.33a2.27 2.27 0 0 0-4.538 0v6.813h-2.647a2.27 2.27 0 0 0 0 4.538h2.647V28.49a2.27 2.27 0 0 0 4.538 0V13.681h2.647a2.27 2.27 0 0 0 0-4.538"
        ></path>
        <path
          fill="#FF6066"
          d="M73.025 2.33a2.27 2.27 0 1 1-4.538 0 2.27 2.27 0 0 1 4.538 0"
        ></path>
        <path
          fill="#4FB5E8"
          d="M99.748 2.33a2.27 2.27 0 1 1-4.539 0 2.27 2.27 0 0 1 4.539 0"
        ></path>
      </g>
    </svg>
  );

  const googleSvg = (
    <svg
      className={styles.googleLogo}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
    >
      <g fill="none" fillRule="evenodd">
        <path
          fill="#4285F4"
          d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        ></path>
        <path
          fill="#34A853"
          d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        ></path>
        <path
          fill="#FBBC05"
          d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        ></path>
        <path
          fill="#EA4335"
          d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        ></path>
      </g>
    </svg>
  );

  return (
    <div className={styles.login}>
      <img
        className={styles.habiticaLogo}
        src={logo}
        alt="habitica"
        onClick={loginHandler}
      />
      {habiticaSvg}
      <button className={styles.login__button} onClick={loginHandler}>
        {googleSvg} Log In with Google
      </button>
    </div>
  );
};
