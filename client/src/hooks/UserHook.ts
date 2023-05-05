import { useEffect, useState } from 'react';
import { doGraphQLFetch } from '../graphql/fetch';
import {
  checkTokenQuery,
  deleteCurrentUserQuery,
} from '../graphql/queriesUser';
import { graphqlUrl } from '../utils/url';
import { User, UserNameId } from '../interfaces/User';
import { getUserQuery } from '../graphql/queriesUser';

const useUser = () => {
  const token = localStorage.getItem('token');
  const [currentUser, setCurrentUser] = useState<Pick<User, 'id' | 'role'>>();

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
      console.error('get currentUser', error);
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
      return res.deleteUser;
    } catch (error) {
      console.error('delete user', error);
    }
  };
  const getUserById = async (username: string) => {
    try {
      const res = await doGraphQLFetch(graphqlUrl, getUserQuery, { username });
      return res.userByUsername as UserNameId;
    } catch (error) {
      console.error('get user', error);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  return { currentUser, deleteCurrentUser, getUserById };
};

export default useUser;
