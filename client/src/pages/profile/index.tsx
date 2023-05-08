import { useParams } from 'react-router-dom';
import useUser from '../../hooks/UserHook';
import { useEffect, useState } from 'react';
import LoggedUserView from './LoggedUserView';

// Page that displays the user's info

function Profile() {
  const { username } = useParams();
  const [userid, setUserid] = useState<string>('');
  const { currentUser, getUserById } = useUser();

  const getUser = async () => {
    if (username === undefined) return;
    const res = await getUserById(username);
    if (!res) return;
    setUserid(res.id);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div style={{ padding: '2em' }}>
      <h1>Profile page {username}</h1>
      {currentUser !== undefined && currentUser.id === userid && (
        <LoggedUserView userid={currentUser.id} />
      )}
    </div>
  );
}

export default Profile;
