import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import {
  createPath,
  loginPath,
  logoutPath,
  registerPath,
} from './utils/RouterPaths';
import CreateItem from './components/CreateItem';
import Home from './pages/Home';
import Logout from './pages/Logout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={loginPath} element={<Login />} />
        <Route path={registerPath} element={<Register />} />
        <Route path={createPath} element={<CreateItem />} />
        <Route path={logoutPath} element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
