import { useContext, useState } from 'react';
import { doGraphQLFetch } from '../graphql/fetch';
import { loginQuery } from '../graphql/queriesUser';
import { Credentials } from '../interfaces/Credentials';
import LoginMessageResponse from '../interfaces/LoginMessageResponse';
import { Link, useNavigate } from 'react-router-dom';
import { registerPath } from '../utils/RouterPaths';
import CheckIfLoggedIn from '../components/CheckIfLoggedIn';
import { Button } from 'react-bootstrap';
import { useAuth } from '../hooks/AuthHooks';
import { MainContext } from '../context/MainContext';

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials: Credentials = {
      username: username,
      password: password,
    };
    const res = await login(credentials);
    if (!res) return alert('Login failed');
    navigate('/');
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
