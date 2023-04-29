import { useEffect, useState } from 'react';
import { doGraphQLFetch } from '../graphql/fetch';
import {
  checkTokenQuery,
  deleteCurrentUserQuery,
} from '../graphql/queriesUser';
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
  const deleteCurrentUser = async () => {
    try {
      if (!token) {
        return;
      }
      const res = await doGraphQLFetch(
        graphqlUrl,
        deleteCurrentUserQuery,
        {},
        token
      );
      console.log('deleteCurrentUser', res.deleteUser);
      return res.deleteUser;
    } catch (error) {
      console.error('delete user', error);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  return { currentUser, deleteCurrentUser };
};

export default useUser;
