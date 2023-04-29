import { useEffect, useState } from 'react';
import { doGraphQLFetch } from '../graphql/fetch';
import { checkTokenQuery } from '../graphql/queriesUser';
import { graphqlUrl } from '../utils/url';
import { UserOutPut } from '../interfaces/User';

const useUser = () => {
  const token = localStorage.getItem('token');
  const [currentUser, setCurrentUser] = useState<UserOutPut>();

  const getCurrentUser = async () => {
    try {
      if (!token) {
        return;
      }
      const res = await doGraphQLFetch(graphqlUrl, checkTokenQuery, {}, token);
      const userData = res.checkToken.user;
      if (!userData) {
        return;
      }
      setCurrentUser(res.checkToken.user);
    } catch (error) {
      console.error('getCurrentUser', error);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  return { currentUser };
};

export default useUser;
