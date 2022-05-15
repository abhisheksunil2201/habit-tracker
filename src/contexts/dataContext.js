import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase";

const defaultValues = {
  coins: 0,
  quotes: [],
};

const DataContext = createContext(defaultValues);
const quotesDefault = [
  {
    quote: "“The bad news is time flies. The good news is you’re the pilot.“",
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
    quotedBy: "Winston Churchill",
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

const DataProvider = ({ children }) => {
  const [coins, setCoins] = useState(0);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    async function getQuotes() {
      const quotesCol = collection(db, "quotes");
      const quotesSnapshot = await getDocs(quotesCol);
      const quotesList = quotesSnapshot.docs.map((doc) => doc.data());
      return quotesList;
    }
    //getQuotes().then((data) => setQuotes(data));
    setQuotes(quotesDefault);
    setCoins(9899);
  }, []);

  return (
    <DataContext.Provider value={{ ...defaultValues, coins, quotes }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };
