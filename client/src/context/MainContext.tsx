import React, { useState } from 'react';
type MainContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  // someFunction: () => void;
};
const MainContext = React.createContext<MainContextType>({} as MainContextType);

const MainProvider = (props: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [update, setUpdate] = useState(0);
  const [token, setToken] = useState();

  return (
    <MainContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        // setIsLoggedIn,
        // user,
        // setUser,
        // update,
        // setUpdate,
        // profile,
        // setProfile,
        // token,
        // setToken,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
