import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { createPath, logoutPath } from '../utils/RouterPaths';
import { Container, NavDropdown, Navbar } from 'react-bootstrap';

function TopNavBar() {
  return (
    <Navbar id="topnav-bar">
      <Container>
        <MenuButton />
        <div>Search</div>
        <ProfileMenuButton />
        {/* <NavDropdown title="Admin" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
        </NavDropdown> */}
      </Container>
    </Navbar>
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
  // const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <div id="profile-menu-btn">
      <NavDropdown
        title={localStorage.getItem('username')}
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item
          onClick={() =>
            navigate(`/profile/${localStorage.getItem('username')}`)
          }
        >
          Profile
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => navigate(logoutPath)}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

export default TopNavBar;
