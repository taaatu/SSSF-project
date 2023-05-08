import Button from 'react-bootstrap/esm/Button';
import Stack from 'react-bootstrap/esm/Stack';
import RentDealCardReceived from '../../components/cards/RentDealCardReceived';
import useRentDeal from '../../hooks/RentDealHooks';
import useUser from '../../hooks/UserHook';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/MainContext';
import RentDealCardSent from '../../components/cards/RentDealCardSent';
import Tabs from 'react-bootstrap/esm/Tabs';
import Tab from 'react-bootstrap/esm/Tab';
import { ItemCardData } from '../../interfaces/Item';
import { useItem } from '../../hooks/ItemHooks';
import ItemList from '../../components/ItemList';

const LoggedUserView = (props: { userid: string }) => {
  const { deleteCurrentUser } = useUser();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(MainContext);
  const { rentDealsReceived, rentDealsSent } = useRentDeal();
  const { getItemsByUser } = useItem();
  const [items, setItems] = useState<ItemCardData[]>([]);

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

  const getItems = async () => {
    const res = await getItemsByUser(props.userid);
    setItems(res as ItemCardData[]);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Stack gap={3}>
      <Button variant="danger" onClick={handleDelete}>
        Delete account
      </Button>
      <Tabs defaultActiveKey="items" className="mb-3">
        <Tab eventKey="items" title="Your items">
          <ItemList items={items} />
        </Tab>
        <Tab eventKey="received" title="Rent requests received">
          <Stack gap={3} direction="horizontal" className="flex-wrap">
            {rentDealsReceived.map((rentDeal) => (
              <RentDealCardReceived rentDeal={rentDeal} />
            ))}
          </Stack>
        </Tab>
        <Tab eventKey="sent" title="Rent requests sent">
          <Stack gap={3} direction="horizontal" className="flex-wrap">
            {rentDealsSent.map((rentDeal) => (
              <RentDealCardSent rentDeal={rentDeal} />
            ))}
          </Stack>
        </Tab>
      </Tabs>
    </Stack>
  );
};

export default LoggedUserView;
