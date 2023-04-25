import { useEffect, useState } from 'react';
import { doGraphQLFetch } from '../graphql/fetch';
import { checkTokenQuery } from '../graphql/queriesUser';
import { Navigate } from 'react-router-dom';

function CheckIfLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const token = localStorage.getItem('token');

  const checkToken = async () => {
    if (token === null) {
      setIsLoggedIn(false);
      return;
    }
    try {
      const url = 'http://localhost:3000/graphql';
      const isTokenValid = await doGraphQLFetch(
        url,
        checkTokenQuery,
        {},
        token
      );
      console.log('isTokenValid', isTokenValid);
      if (isTokenValid.checkToken?.message === 'Token is valid') {
        console.log('token valid');
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('check token', error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return <></>;
}

export default CheckIfLoggedIn;
