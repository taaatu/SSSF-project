import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { createPath, loginPath, registerPath } from './utils/RouterPaths';
import CreateItem from './components/CreateItem';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={loginPath} element={<Login />} />
        <Route path={registerPath} element={<Register />} />
        <Route path={createPath} element={<CreateItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
