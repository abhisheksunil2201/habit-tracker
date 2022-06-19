import { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./userContext";
import { quotesDefault } from "../constants";
import { v4 as uuid } from "uuid";

const defaultValues = {
  coins: 0,
  quotes: quotesDefault,
};

const DataContext = createContext(defaultValues);

const DataProvider = ({ children }) => {
  const [coins, setCoins] = useState(0);
  const [quotes, setQuotes] = useState([]);
  const [habits, setHabits] = useState([]);
  const [completedHabits, setCompletedHabits] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    async function getQuotes() {
      const quotesCol = collection(db, "quotes");
      const quotesSnapshot = await getDocs(quotesCol);
      const quotesList = quotesSnapshot.docs.map((doc) => doc.data());
      return quotesList;
    }
    getQuotes().then((data) => setQuotes(data));
  }, []);

  useEffect(() => {
    async function getCoins() {
      try {
        const coinsCol = doc(db, `coins/${user?.user.uid}`);
        const coins = await (await getDoc(coinsCol)).data();
        return coins.coins;
      } catch (error) {
        console.log(error);
      }
      return 0;
    }
    user?.user.uid && getCoins().then((data) => setCoins(data));
  }, [user]);

  const getHabits = async () => {
    const habitsCol = doc(db, `habits/${user?.user.uid}`);
    const habits = (await getDoc(habitsCol)).data();
    if (habits?.habits.length) setHabits(habits.habits);
    return [];
  };

  const getCompletedHabits = async () => {
    const habitsCol = doc(db, `completedHabits/${user?.user.uid}`);
    const habits = (await getDoc(habitsCol)).data();
    if (habits?.habits.length) setCompletedHabits(habits.habits);
    return [];
  };

  useEffect(() => {
    getHabits();
    getCompletedHabits();
  }, [user]);

  const addHabit = async ({ habit, startDate, endDate, goal, frequency }) => {
    await setDoc(doc(db, "habits", user?.user.uid), {
      habits: [
        ...habits,
        {
          id: uuid(),
          habit,
          startDate,
          endDate,
          goal,
          frequency,
        },
      ],
    });
    getHabits();
  };

  const habitCompletedOnce = async (id, currentProgress) => {
    console.log(id, currentProgress);
    await setDoc(
      doc(
        db,
        `habitProgress/${user?.user.uid}/${new Date(
          new Date().setHours(0, 0, 0, 0)
        ).getTime()}/${id}`
      ),
      {
        progress: currentProgress + 1,
      }
    );
  };

  const getTodayProgress = async (id) => {
    const todayProgress = doc(
      db,
      `habitProgress/${user?.user.uid}/${new Date(
        new Date().setHours(0, 0, 0, 0)
      ).getTime()}/${id}`
    );
    const progress = (await getDoc(todayProgress)).data();
    return progress?.progress;
  };

  const deleteHabit = async (habitToBeDeleted) => {
    await setDoc(doc(db, "habits", user?.user.uid), {
      habits: habits.filter((habit) => habit.id !== habitToBeDeleted.id),
    });
    addToCompletedHabits(habitToBeDeleted);
    getHabits();
    getCompletedHabits();
  };

  const addToCompletedHabits = async ({
    id,
    habit,
    startDate,
    endDate,
    goal,
    frequency,
  }) => {
    await setDoc(doc(db, "completedHabits", user?.user.uid), {
      habits: [
        ...completedHabits,
        {
          id,
          habit,
          startDate,
          endDate,
          goal,
          frequency,
        },
      ],
    });
    await getHabits();
    await getCompletedHabits();
  };

  return (
    <DataContext.Provider
      value={{
        ...defaultValues,
        coins,
        quotes,
        habits,
        setHabits,
        completedHabits,
        setCompletedHabits,
        addHabit,
        deleteHabit,
        habitCompletedOnce,
        getTodayProgress,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };
