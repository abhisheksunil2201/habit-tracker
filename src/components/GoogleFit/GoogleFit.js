import { addDays } from "date-fns";
import React from "react";
import { useAuth } from "../../contexts/userContext";

export const GoogleFit = () => {
  const { user } = useAuth();

  const fetchData = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "text/plain");
    headers.append("Authorization", `Bearer ${user?.token}`);
    console.log(headers.get("Authorization"));

    const requestOptions = {
      method: "post",
      mode: "cors",
      headers: headers,
      aggregateBy: [
        {
          dataTypeName: "com.google.step_count.delta",
          dataSourceId:
            "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
        },
      ],
      bucketByTime: { durationMillis: 86400000 },
      startTimeMillis: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
      endTimeMillis: new Date(
        addDays(new Date(), 1).setHours(0, 0, 0, 0)
      ).getTime(),
    };

    const data = await fetch(
      "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      {
        requestOptions,
      }
    );
    console.log(data);
  };
  user?.token && fetchData();
  return <div>GoogleFit</div>;
};
