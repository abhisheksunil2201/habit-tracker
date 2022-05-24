import { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./userContext";

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

const defaultValues = {
  coins: 0,
  quotes: quotesDefault,
};

const DataContext = createContext(defaultValues);

const DataProvider = ({ children }) => {
  const [coins, setCoins] = useState(0);
  const [quotes, setQuotes] = useState([]);
  const [habits, setHabits] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    async function getQuotes() {
      const quotesCol = collection(db, "quotes");
      const quotesSnapshot = await getDocs(quotesCol);
      const quotesList = quotesSnapshot.docs.map((doc) => doc.data());
      return quotesList;
    }
    getQuotes().then((data) => setQuotes(data));

    async function getCoins() {
      const coinsCol = collection(db, "coins");
      const coinsSnapshot = await getDocs(coinsCol);
      const coins = coinsSnapshot.docs.filter(
        (doc) => doc.id === user?.user.uid
      );
      if (coins.length) return coins[0].data().coins;
      return 0;
    }
    getCoins().then((data) => setCoins(data));

    async function getHabits() {
      // await setDoc(doc(db, "habits", user?.user.uid), {
      //   habits: [
      //     {
      //       habit: "Cook",
      //       startDate: "2022-05-23T09:44:07.494Z",
      //       endDate: "2022-05-23T09:44:07.494Z",
      //       goal: 22,
      //       frequency: "daily",
      //     },
      //     {
      //       habit: "clean",
      //       startDate: "2022-05-23T09:44:15.447Z",
      //       endDate: "2022-05-23T09:44:15.447Z",
      //       goal: 1,
      //       frequency: "daily",
      //     },
      //   ],
      // });
      const habitsCol = collection(db, "habits");
      const habitsSnapshot = await getDocs(habitsCol);
      const habits = habitsSnapshot.docs.filter(
        (doc) => doc.id === user?.user.uid
      );
      console.log("Habits from db are", habits[0]?.data().habits);
      if (habits.length) return habits[0].data().habits;
      return [];
    }
    getHabits().then((data) => setHabits(data));
  }, [user]);

  return (
    <DataContext.Provider
      value={{ ...defaultValues, coins, quotes, habits, setHabits }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };
