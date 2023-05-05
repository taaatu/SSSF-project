import { useContext } from 'react';
import { MainContext } from '../context/MainContext';
import { doGraphQLFetch } from '../graphql/fetch';
import { loginQuery, registerQuery } from '../graphql/queriesUser';
import { Credentials } from '../interfaces/Credentials';
import LoginMessageResponse from '../interfaces/LoginMessageResponse';
import { RegisterInput } from '../interfaces/User';
import { graphqlUrl } from '../utils/url';

const useAuth = () => {
  const { setIsLoggedIn } = useContext(MainContext);
  const register = async (data: RegisterInput) => {
    try {
      const res = await doGraphQLFetch(graphqlUrl, registerQuery, {
        user: data,
      });
      return res.register;
    } catch (error) {
      console.error('register error', error);
    }
  };
  const login = async (credentials: Credentials) => {
    try {
      const res = (await doGraphQLFetch(graphqlUrl, loginQuery, {
        credentials,
      })) as LoginMessageResponse;
      if (res.login.token == undefined) return undefined;
      localStorage.setItem('token', res.login.token);
      localStorage.setItem('username', res.login.user.user_name);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error('login error', error);
    }
  };
  return { register, login };
};

export { useAuth };
