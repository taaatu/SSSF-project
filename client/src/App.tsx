import { Routes, Route, HashRouter } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import {
  createPath,
  createRentDealPath,
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
import CreateRentDeal from './pages/CreateRentDeal';
import TopNavBar from './components/TopNavBar';
import { MainProvider } from './context/MainContext';

function App() {
  return (
    <HashRouter>
      <MainProvider>
        <TopNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={loginPath} element={<Login />} />
          <Route path={registerPath} element={<Register />} />
          <Route path={createPath} element={<CreateItem />} />
          <Route path={logoutPath} element={<Logout />} />
          <Route path={itemPath} element={<ItemPage />} />
          <Route path={modifyItemPath} element={<ModifyItem />} />
          <Route path={profilePath} element={<Profile />} />
          <Route path={createRentDealPath} element={<CreateRentDeal />} />
        </Routes>
      </MainProvider>
    </HashRouter>
  );
}

export default App;
