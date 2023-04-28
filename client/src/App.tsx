import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import {
  createPath,
  itemPath,
  loginPath,
  logoutPath,
  registerPath,
} from './utils/RouterPaths';
import CreateItem from './components/CreateItem';
import Home from './pages/Home';
import Logout from './pages/Logout';
import ItemPage from './pages/ItemPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={loginPath} element={<Login />} />
        <Route path={registerPath} element={<Register />} />
        <Route path={createPath} element={<CreateItem />} />
        <Route path={logoutPath} element={<Logout />} />
        <Route path={itemPath} element={<ItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
