import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import {
  createPath,
  itemPath,
  loginPath,
  logoutPath,
  modifyItemPath,
  profilePath,
  registerPath,
} from './utils/RouterPaths';
import CreateItem from './pages/CreateItem';
import Home from './pages/Home';
import Logout from './pages/Logout';
import ItemPage from './pages/ItemPage';
import ModifyItem from './pages/ModifyItem';
import Profile from './pages/Profile';

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
        <Route path={modifyItemPath} element={<ModifyItem />} />
        <Route path={profilePath} element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
