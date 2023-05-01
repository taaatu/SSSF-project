import { useState } from 'react';
import { doGraphQLFetch } from '../graphql/fetch';
import { register } from '../graphql/queriesUser';
import { RegisterInput } from '../interfaces/User';
import { Link } from 'react-router-dom';
import { loginPath } from '../utils/RouterPaths';
import CheckIfLoggedIn from '../components/CheckIfLoggedIn';

function Register() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:3000/graphql';
      const user: RegisterInput = {
        user_name: username,
        email: email,
        password: password,
      };
      const res = await doGraphQLFetch(url, register, { user });
      console.log('submit', res);
    } catch (error) {
      console.error('login submit', error);
    }
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
        <button type="submit">Register</button>
        <Link className="nav-link" to={loginPath}>
          Login
        </Link>
      </form>
    </div>
  );
}

export default Register;
