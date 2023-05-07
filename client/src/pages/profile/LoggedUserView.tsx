import Button from 'react-bootstrap/esm/Button';
import Stack from 'react-bootstrap/esm/Stack';
import RentDealCardReceived from '../../components/cards/RentDealCardReceived';
import useRentDeal from '../../hooks/RentDealHooks';
import useUser from '../../hooks/UserHook';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import RentDealCardSent from '../../components/cards/RentDealCardSent';

const LoggedUserView = () => {
  const { deleteCurrentUser } = useUser();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(MainContext);
  const { rentDealsReceived, rentDealsSent } = useRentDeal();

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

  return (
    <div>
      <Button variant="danger" onClick={handleDelete}>
        Delete account
      </Button>
      <Stack direction="horizontal" gap={3} style={{ alignItems: 'start' }}>
        <div>
          <h3>Rent requests received</h3>
          {rentDealsReceived.map((rentDeal) => (
            <RentDealCardReceived rentDeal={rentDeal} />
          ))}
        </div>
        <div>
          <h3>Rent requests sent</h3>
          {rentDealsSent.map((rentDeal) => (
            <RentDealCardSent rentDeal={rentDeal} />
          ))}
        </div>
      </Stack>
    </div>
  );
};

export default LoggedUserView;
