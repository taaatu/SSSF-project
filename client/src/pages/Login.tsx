import { useState } from 'react';
import { Credentials } from '../interfaces/Credentials';
import { Link, useNavigate } from 'react-router-dom';
import { registerPath } from '../utils/RouterPaths';
import CheckIfLoggedIn from '../components/CheckIfLoggedIn';
import { Button } from 'react-bootstrap';
import { useAuth } from '../hooks/AuthHooks';

// Login page

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
          required
          className="form-input"
          type="email"
          placeholder="Email"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          required
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
