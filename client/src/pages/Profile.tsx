import { useNavigate, useParams } from 'react-router-dom';
import useUser from '../hooks/UserHook';
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { MainContext } from '../context/MainContext';

// Page that displays the user's info

function Profile() {
  const { username } = useParams();
  const [userid, setUserid] = useState<string>('');
  const { currentUser, deleteCurrentUser, getUserById } = useUser();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(MainContext);

  const getUser = async () => {
    if (username === undefined) return;
    const res = await getUserById(username);
    if (!res) return;
    setUserid(res.id);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your account?')) {
      return;
    }
    const deleteUser = await deleteCurrentUser();
    if (deleteUser) {
      alert('Account deleted');
      navigate('/');
      localStorage.clear();
      setIsLoggedIn(false);
      return;
    }
    alert('Deleting account failed');
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div style={{ padding: '2em' }}>
      <h1>Profile page {username}</h1>
      {currentUser !== undefined && currentUser.id === userid && (
        <>
          <Button variant="danger" onClick={handleDelete}>
            Delete account
          </Button>
        </>
      )}
    </div>
  );
}

export default Profile;
