import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/dataContext";
import styles from "./Quotes.module.css";

export const Quotes = () => {
  const [numberFromDate, setNumberFromDate] = useState(0);
  const { quotes } = useData();

  const images = [
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg",
    "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/02/13/12/26/aurora-1197753_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/01/28/23/34/mountains-615428_1280.jpg",
  ];
  useEffect(() => {
    setNumberFromDate(Math.floor(new Date().getDate() / 6));
  }, []);
  return (
    <div
      className={styles.quotes}
      style={{
        backgroundImage: `url(${images[numberFromDate]})`,
      }}
    >
      <p className={styles.quote}>{quotes[numberFromDate]?.quote}</p>
      <p className={styles.quotedBy}>{quotes[numberFromDate]?.quotedBy}</p>
    </div>
  );
};
