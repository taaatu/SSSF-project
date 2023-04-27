import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { loginPath } from '../utils/RouterPaths';

function Logout() {
  useEffect(() => {
    localStorage.removeItem('token');
  }, []);
  return <Navigate to={loginPath} replace={true} />;
}

export default Logout;
