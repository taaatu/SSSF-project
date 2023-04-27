import { useState } from 'react';
import { doGraphQLFetch } from '../graphql/fetch';
import { login } from '../graphql/queriesUser';
import { Credentials } from '../interfaces/Credentials';
import LoginMessageResponse from '../interfaces/LoginMessageResponse';
import { Link } from 'react-router-dom';
import { registerPath } from '../utils/RouterPaths';
import CheckIfLoggedIn from '../components/CheckIfLoggedIn';

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:3000/graphql';
      const credentials: Credentials = {
        username: username,
        password: password,
      };
      const res = (await doGraphQLFetch(url, login, {
        credentials,
      })) as LoginMessageResponse;
      const token = res.login.token;
      if (token === undefined) {
        console.log('no token');
        return;
      }
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('login submit', error);
    }
  };

  return (
    <div>
      <CheckIfLoggedIn />
      <h1>Login</h1>
      <form className="column" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
      <Link to={registerPath}>Register</Link>
    </div>
  );
}

export default Login;
