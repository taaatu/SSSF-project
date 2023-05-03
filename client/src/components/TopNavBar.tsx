import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPath, loginPath, logoutPath } from '../utils/RouterPaths';
import { Nav, Navbar } from 'react-bootstrap';
import { MainContext } from '../context/MainContext';

function TopNavBar() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(MainContext);
  return (
    <Navbar sticky="top" id="topnav-bar">
      <Navbar.Brand>RentIT</Navbar.Brand>
      <Navbar.Collapse>
        <Nav>
          <Nav.Link>
            <div onClick={() => navigate('/')}>Home</div>
          </Nav.Link>
          {isLoggedIn ? (
            <LoggedInNavs />
          ) : (
            <Nav.Link>
              <div onClick={() => navigate(loginPath)}>Login</div>
            </Nav.Link>
          )}

          {/* <Nav.Link>
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
            </Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
      {isLoggedIn && (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:{' '}
            <a href="#login">{localStorage.getItem('username')}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      )}

      {/* <MenuButton /> */}
      {/* <div>Search</div> */}
      {/* <ProfileMenuButton /> */}
      {/* <NavDropdown title="Admin" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
        </NavDropdown> */}
    </Navbar>
  );
}

const LoggedInNavs = () => {
  const navigate = useNavigate();
  return (
    <>
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
    </>
  );
};

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
