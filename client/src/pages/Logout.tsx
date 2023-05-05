import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { loginPath } from '../utils/RouterPaths';
import { MainContext } from '../context/MainContext';

// Logout page that removes the token and username from local storage

function Logout() {
  const { setIsLoggedIn } = useContext(MainContext);
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  }, []);
  return <Navigate to={loginPath} replace={true} />;
}

export default Logout;
