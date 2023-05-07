import React, { useState } from 'react';

type MainContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  update: number;
  setUpdate: React.Dispatch<React.SetStateAction<number>>;
};
const MainContext = React.createContext<MainContextType>({} as MainContextType);

const MainProvider = (props: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('token') !== null
  );
  const [update, setUpdate] = useState(0);

  return (
    <MainContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        update,
        setUpdate,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
