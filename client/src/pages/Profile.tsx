import { useParams } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import { useEffect, useState } from 'react';
import useUser from '../hooks/UserHook';

function Profile() {
  const { username } = useParams();
  const { currentUser } = useUser();
  //   useEffect(() => {}, []);
  return (
    <div>
      <TopNavBar />
      <h1>Profile page {username}</h1>
      {currentUser !== undefined && currentUser.user_name === username && (
        <>
          <button>Modify</button>
          <button>Delete</button>
        </>
      )}
    </div>
  );
}

export default Profile;
