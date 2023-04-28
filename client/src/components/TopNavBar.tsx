import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiUser } from 'react-icons/fi';
import { createPath, logoutPath } from '../utils/RouterPaths';

function TopNavBar() {
  return (
    <header id="topnav-bar">
      <MenuButton />
      <div>Search</div>
      <ProfileMenuButton />
    </header>
  );
}

const MenuButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div id="menu">
      <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FiMenu />
      </div>
      {isMenuOpen && (
        <nav className="dropdown-content column">
          <Link to="/">Home</Link>
          <Link to={createPath}>Create</Link>
        </nav>
      )}
    </div>
  );
};

const ProfileMenuButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div id="profile-menu-btn">
      <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FiUser />
      </div>
      {isMenuOpen && (
        <nav className="dropdown-content">
          <Link to={logoutPath}>Logout</Link>
        </nav>
      )}
    </div>
  );
};

export default TopNavBar;
