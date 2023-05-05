import { useEffect, useState } from 'react';
import { doGraphQLFetch } from '../graphql/fetch';
import { checkTokenQuery } from '../graphql/queriesUser';
import { Navigate } from 'react-router-dom';
import { graphqlUrl } from '../utils/url';

// Cheks if user is logged in then redirects to home page

function CheckIfLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const token = localStorage.getItem('token');

  const checkToken = async () => {
    if (token === null) {
      setIsLoggedIn(false);
      return;
    }
    try {
      const isTokenValid = await doGraphQLFetch(
        graphqlUrl,
        checkTokenQuery,
        {},
        token
      );
      if (isTokenValid.checkToken?.message === 'Token is valid') {
        setIsLoggedIn(true);
      }
    } catch (error) {
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
