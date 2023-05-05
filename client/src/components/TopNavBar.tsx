import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPath, loginPath, logoutPath } from '../utils/RouterPaths';
import { Nav, Navbar } from 'react-bootstrap';
import { MainContext } from '../context/MainContext';

// Top navigation bar component that has links to the pages
// if user is not logged in, it has links to only home and login

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
        </Nav>
      </Navbar.Collapse>
      {isLoggedIn && (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a>{localStorage.getItem('username')}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}

// navigation links for logged in users

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

export default TopNavBar;
