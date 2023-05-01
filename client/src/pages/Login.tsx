import { useState } from 'react';
import { doGraphQLFetch } from '../graphql/fetch';
import { login } from '../graphql/queriesUser';
import { Credentials } from '../interfaces/Credentials';
import LoginMessageResponse from '../interfaces/LoginMessageResponse';
import { Link, useNavigate } from 'react-router-dom';
import { registerPath } from '../utils/RouterPaths';
import CheckIfLoggedIn from '../components/CheckIfLoggedIn';
import { Button } from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

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
      if (!res.login) alert('Login failed');
      const token = res.login.token;
      if (token === undefined) {
        console.log('no token');
        return;
      }
      localStorage.setItem('token', token);
      localStorage.setItem('username', res.login.user.user_name);
      navigate('/');
    } catch (error) {
      console.error('login submit', error);
    }
  };

  return (
    <div className="auth-div">
      <CheckIfLoggedIn />
      <h1>Login</h1>
      <form className="my-form column" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="email"
          placeholder="Email"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="form-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
        <Link className="nav-link" to={registerPath}>
          Register
        </Link>
      </form>
    </div>
  );
}

export default Login;
