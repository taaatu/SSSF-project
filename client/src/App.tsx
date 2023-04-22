import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { loginPath, registerPath } from './utils/RouterPaths';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={loginPath} element={<Login />} />
        <Route path={registerPath} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
