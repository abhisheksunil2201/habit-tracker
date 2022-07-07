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
  const [streak, setStreak] = useState({
    currentStreak: 0,
    longestStreak: 0,
    lastUpdated: null,
  });
  const [deletedHabits, setDeletedHabits] = useState([]);
  const [activeHabits, setActiveHabits] = useState([]);
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
        const coins = (await getDoc(coinsCol)).data();
        if (!coins) {
          setDoc(doc(db, `coins/${user?.user.uid}`), {
            coins: 0,
          });
          return 0;
        }
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
    if (habits?.habits.length) {
      const unresolvedHabitsWithProgress = habits.habits.map(async (habit) => {
        const progress = await getTodayProgress(habit.id);
        return {
          ...habit,
          progress: progress,
        };
      });
      const resolvedHabitsWithProgress = await Promise.all(
        unresolvedHabitsWithProgress
      );
      setHabits(resolvedHabitsWithProgress);
    }
    return [];
  };

  const getDeletedHabits = async () => {
    const habitsCol = doc(db, `deletedHabits/${user?.user.uid}`);
    const habits = (await getDoc(habitsCol)).data();
    if (habits?.habits.length) setDeletedHabits(habits.habits);
    return [];
  };

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

  const editHabit = async (habitToBeEdited) => {
    const newHabits = habits.map((habit) => {
      if (habit.id === habitToBeEdited.id) {
        return habitToBeEdited;
      }
      return habit;
    });
    await setDoc(doc(db, "habits", user?.user.uid), {
      habits: newHabits,
    });
    getHabits();
  };

  const getStreakDetails = async () => {
    const streakCol = doc(db, `streak/${user?.user.uid}`);
    const streakDetails = (await getDoc(streakCol)).data();
    streakDetails &&
      setStreak({
        currentStreak: streakDetails.currentStreak,
        longestStreak: streakDetails.longestStreak,
        lastUpdated: streakDetails.lastUpdated,
      });
  };

  const updateStreak = async () => {
    const longestStreak =
      streak.currentStreak > streak.longestStreak
        ? streak.currentStreak
        : streak.longestStreak;
    await setDoc(doc(db, `streak/${user?.user.uid}`), {
      currentStreak: streak.currentStreak + 1,
      longestStreak: longestStreak,
      lastUpdated: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
    });
    setStreak({
      currentStreak: streak.currentStreak + 1,
      longestStreak: longestStreak,
      lastUpdated: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
    });
  };

  const habitCompletedOnce = async (id, currentProgress) => {
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
    return progress?.progress || 0;
  };

  const deleteHabit = async (habitToBeDeleted) => {
    await setDoc(doc(db, "habits", user?.user.uid), {
      habits: habits.filter((habit) => habit.id !== habitToBeDeleted.id),
    });
    addToDeletedHabits(habitToBeDeleted);
    getHabits();
    getDeletedHabits();
  };

  const addToDeletedHabits = async ({
    id,
    habit,
    startDate,
    endDate,
    goal,
    frequency,
  }) => {
    await setDoc(doc(db, "deletedHabits", user?.user.uid), {
      habits: [
        ...deletedHabits,
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
    await getDeletedHabits();
  };

  async function addCoins(coinsToBeAdded) {
    try {
      setDoc(doc(db, `coins/${user?.user.uid}`), {
        coins: coins + coinsToBeAdded,
      });
      setCoins(coins + coinsToBeAdded);
    } catch (error) {
      console.log(error);
    }
  }

  const resetData = () => {
    setCoins(0);
    setHabits([]);
    setStreak({
      currentStreak: 0,
      longestStreak: 0,
      lastUpdated: null,
    });
  };

  useEffect(() => {
    getHabits();
    getDeletedHabits();
    getStreakDetails();
  }, [user]);

  return (
    <DataContext.Provider
      value={{
        ...defaultValues,
        coins,
        quotes,
        habits,
        setHabits,
        deletedHabits,
        setDeletedHabits,
        addHabit,
        deleteHabit,
        habitCompletedOnce,
        getTodayProgress,
        updateStreak,
        streak,
        editHabit,
        resetData,
        activeHabits,
        setActiveHabits,
        completedHabits,
        setCompletedHabits,
        addCoins,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };
