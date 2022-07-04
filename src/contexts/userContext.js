import { createContext, useContext, useEffect, useState } from "react";

const defaultValues = {
  user: null,
};

const UserContext = createContext(defaultValues);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.getItem("user") &&
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <UserContext.Provider value={{ ...defaultValues, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useAuth = () => useContext(UserContext);

export { UserProvider, useAuth };
