import React, { useState } from 'react';

type MainContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};
const MainContext = React.createContext<MainContextType>({} as MainContextType);

const MainProvider = (props: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <MainContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
