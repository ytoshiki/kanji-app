import React, { useCallback, useState } from "react";

// set context type
type UserContextType = {
  loggedIn: boolean,
  setLoggedIn: (loggedIn: boolean) => void;
};


const defaultContext: UserContextType = {
  loggedIn: false,
  setLoggedIn: () => {},
};

export const useUserLoggedIn = (): UserContextType => {

  let value = false;

  if (typeof window !== 'undefined') {
    value = !!localStorage.getItem("kanji-gql-token");
  }

  const [loggedIn, setIsLoggedIn] = useState(value);
  
  const setLoggedIn = useCallback((current: boolean): void => {
    setIsLoggedIn(current);
  }, []);

  return {
    loggedIn,
    setLoggedIn,
  };
};

export const UserContext = React.createContext<UserContextType>(defaultContext);
export const UserProvider = UserContext.Provider;