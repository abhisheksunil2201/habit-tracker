import { addHours, format, subDays } from "date-fns";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

export const fetchNewToken = async (user) => {
  return fetch(
    `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: user.user.stsTokenManager.refreshToken,
      }),
    }
  ).then((res) => res.json());
};

export const checkForExpiryAndRefreshToken = async (
  user,
  setUser,
  navigate,
  resetData
) => {
  let now = new Date().getTime();
  let expiry = localStorage.getItem("expiresIn");

  if (now - expiry > 60 * 60 * 1000) {
    console.log("expired");
    logoutHandler(setUser, navigate, resetData);
    return false;
    /*
    //TRIED TO FETCH A NEW REFRESH TOKEN SO THAT USER DOESN'T HAVE TO SIGN OUT(WIP)
    let newToken = await fetchNewToken(user);
    localStorage.setItem(
      "expiresIn",
      new Date().getTime() + newToken.expires_in * 1000
    );
    if (newToken.refresh_token.substring(0, 4) !== "ya29") {
      newToken = "ya29." + newToken.refresh_token;
    }
    const existingUser = await JSON.parse(localStorage.getItem("user"));
    console.log(newToken);
    const userDataWithNewToken = {
      ...existingUser,
      token: newToken,
    };
    console.log(userDataWithNewToken);
    localStorage.setItem(
      "user",
      JSON.stringify({ ...existingUser, token: newToken })
    );

    return newToken;
    */
  }
  return user.token;
};

export const loginHandler = (setUser) => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/fitness.activity.read");

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      localStorage.setItem("user", JSON.stringify({ user, token }));
      localStorage.setItem("expiresIn", addHours(new Date(), 1).getTime());
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

export const logoutHandler = (setUser, navigate, resetData) => {
  localStorage.clear();
  setUser(null);
  resetData();
  navigate("/login");
};

export const fetchStepData = async (
  user,
  setData,
  setUser,
  navigate,
  resetData
) => {
  const token = await checkForExpiryAndRefreshToken(
    user,
    setUser,
    navigate,
    resetData
  );
  if (!token) {
    return;
  }
  if (user?.token !== token) {
    setUser({ ...user, token });
  }
  const headers = new Headers();
  headers.append("Content-Type", "text/plain");
  headers.append("Authorization", `Bearer ${token}`);

  const modifyData = (data) => {
    const modifiedData = data?.map((item) => ({
      date: format(new Date(Number(item?.startTimeMillis)), "dd MMM yy"),
      steps: item?.dataset[0]?.point[0]?.value[0]?.intVal,
    }));
    setData({
      labels: modifiedData.map((item) => item.date),
      datasets: [
        {
          label: "Steps",
          data: modifiedData.map((item) => item.steps),
          backgroundColor: "#294261",
        },
      ],
    });
  };

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "text/plain",
    },
    aggregateBy: [
      {
        dataTypeName: "com.google.step_count.delta",
        dataSourceId:
          "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
      },
    ],
    bucketByTime: { durationMillis: 86400000 },
    startTimeMillis: new Date(
      subDays(new Date(), 7).setHours(0, 0, 0, 0)
    ).getTime(),
    endTimeMillis: new Date(new Date().setHours(23, 59, 59, 0)).getTime(),
  };
  fetch("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "text/plain",
    },
    body: JSON.stringify(requestOptions),
  })
    .then((res) => res.json())
    .then((bucket) => modifyData(bucket.bucket));
};

export const sortHabits = (habits, setActiveHabits, setCompletedHabits) => {
  setActiveHabits(habits.filter((habit) => habit.progress !== habit.goal));
  setCompletedHabits(habits.filter((habit) => habit.progress === habit.goal));
};
