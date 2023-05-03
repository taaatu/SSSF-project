import { useState } from 'react';
import { RegisterInput } from '../interfaces/User';
import { Link, useNavigate } from 'react-router-dom';
import { loginPath } from '../utils/RouterPaths';
import CheckIfLoggedIn from '../components/CheckIfLoggedIn';
import { useAuth } from '../hooks/AuthHooks';
import { Credentials } from '../interfaces/Credentials';
import { Button } from 'react-bootstrap';

function Register() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: RegisterInput = {
      user_name: username,
      email: email,
      password: password,
    };
    const res = await register(userData);
    console.log('register handle', res);
    if (res == undefined) return alert('Register failed');
    alert('User created successfully');
    const credentials: Credentials = {
      username: email,
      password: password,
    };
    const loginRes = await login(credentials);
    if (!loginRes) return alert('Login failed');
    navigate('/');
  };

  return (
    <div className="auth-div">
      <CheckIfLoggedIn />
      <h1>Register</h1>
      <form className="my-form column" onSubmit={handleSubmit}>
        <input
          className="form-input"
          required
          type="text"
          placeholder="Username"
          pattern="^[a-zA-Z0-9]*$"
          title="Only letters and numbers are allowed"
          maxLength={30}
          minLength={2}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          required
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-input"
          required
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Register</Button>
        <Link className="nav-link" to={loginPath}>
          Login
        </Link>
      </form>
    </div>
  );
}

export default Register;
