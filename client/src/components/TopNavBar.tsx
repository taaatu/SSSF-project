import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { createPath, logoutPath } from '../utils/RouterPaths';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';

function TopNavBar() {
  const navigate = useNavigate();
  return (
    <Navbar sticky="top" id="topnav-bar">
      <Container>
        <Navbar.Brand>RentIT</Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link>
              <div onClick={() => navigate('/')}>Home</div>
            </Nav.Link>
            <Nav.Link>
              <div onClick={() => navigate(createPath)}>Create</div>
            </Nav.Link>
            <Nav.Link>
              <div
                onClick={() =>
                  navigate(`/profile/${localStorage.getItem('username')}`)
                }
              >
                Profile
              </div>
            </Nav.Link>
            <Nav.Link>
              <div onClick={() => navigate(logoutPath)}>Logout</div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:{' '}
            <a href="#login">{localStorage.getItem('username')}</a>
          </Navbar.Text>
        </Navbar.Collapse>
        {/* <MenuButton /> */}
        {/* <div>Search</div> */}
        {/* <ProfileMenuButton /> */}
        {/* <NavDropdown title="Admin" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
        </NavDropdown> */}
      </Container>
    </Navbar>
  );
}

// const MenuButton = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

//   return (
//     <div id="menu">
//       <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
//         <FiMenu />
//       </div>
//       {isMenuOpen && (
//         <nav className="dropdown-content column">
//           <Link to="/">Home</Link>
//           <Link to={createPath}>Create</Link>
//         </nav>
//       )}
//     </div>
//   );
// };

// const ProfileMenuButton = () => {
//   // const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
//   const navigate = useNavigate();
//   return (
//     <div id="profile-menu-btn">
//       <NavDropdown
//         title={localStorage.getItem('username')}
//         id="basic-nav-dropdown"
//       >
//         <NavDropdown.Item
//           onClick={() =>
//             navigate(`/profile/${localStorage.getItem('username')}`)
//           }
//         >
//           Profile
//         </NavDropdown.Item>
//         <NavDropdown.Divider />
//         <NavDropdown.Item onClick={() => navigate(logoutPath)}>
//           Logout
//         </NavDropdown.Item>
//       </NavDropdown>
//     </div>
//   );
// };

export default TopNavBar;
