import { useNavigate, useParams } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import useUser from '../hooks/UserHook';

function Profile() {
  const { username } = useParams();
  const { currentUser, deleteCurrentUser } = useUser();
  const navigate = useNavigate();
  //   useEffect(() => {}, []);
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your account?')) {
      return;
    }
    const deleteUser = await deleteCurrentUser();
    if (deleteUser) {
      alert('Account deleted');
      navigate('/');
      localStorage.clear();
      return;
    }
    alert('Deleting account failed');
  };
  return (
    <div>
      <TopNavBar />
      <h1>Profile page {username}</h1>
      {currentUser !== undefined && currentUser.user_name === username && (
        <>
          <button>Modify</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default Profile;
