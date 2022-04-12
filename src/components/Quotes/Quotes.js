import React, { useEffect, useState } from "react";
import styles from ".//Quotes.module.css";

export const Quotes = () => {
  const [numberFromDate, setNumberFromDate] = useState(0);
  const quotes = [
    {
      quote: "“The bad news is time flies. The good news is you’re the pilot.",
      quotedBy: "Michael Altshuler",
    },
    {
      quote:
        "“Life has got all those twists and turns. You’ve got to hold on tight and off you go.”",
      quotedBy: "Nicole Kidman",
    },
    {
      quote:
        "“Success is not final, failure is not fatal: it is the courage to continue that counts.”",
      quotedBy: " Winston Churchill",
    },
    {
      quote:
        "“You are never too old to set another goal or to dream a new dream.”",
      quotedBy: "Malala Yousafzai",
    },
    {
      quote:
        "“You can be everything. You can be the infinite amount of things that people are.”",
      quotedBy: "Kesha",
    },
    {
      quote:
        "“What lies behind you and what lies in front of you, pales in comparison to what lies inside of you.”",
      quotedBy: "Ralph Waldo Emerson",
    },
    {
      quote:
        "“It is during our darkest moments that we must focus to see the light.”",
      quotedBy: "Aristotle",
    },
  ];
  const images = [
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg",
    "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/02/13/12/26/aurora-1197753_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/01/28/23/34/mountains-615428_1280.jpg",
  ];
  useEffect(() => {
    setNumberFromDate(new Date().getDate() / 6);
  }, []);
  return (
    <div
      className={styles.quotes}
      style={{
        backgroundImage: `url(${images[numberFromDate]})`,
      }}
    >
      <p className={styles.quote}>{quotes[5].quote}</p>
      <p className={styles.quotedBy}>{quotes[numberFromDate].quotedBy}</p>
    </div>
  );
};
