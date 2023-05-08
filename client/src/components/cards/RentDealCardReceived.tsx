import Card from 'react-bootstrap/esm/Card';
import { RentDealOutput } from '../../interfaces/RentDeal';
import Stack from 'react-bootstrap/esm/Stack';
import Button from 'react-bootstrap/esm/Button';
import { format } from 'date-fns';
import useRentDeal from '../../hooks/RentDealHooks';
import { useContext } from 'react';
import { MainContext } from '../../context/MainContext';

// This component displays the reant deal information

function RentDealCardReceived({ rentDeal }: { rentDeal: RentDealOutput }) {
  const { respondToRentDeal } = useRentDeal(false);
  const { setUpdate, update } = useContext(MainContext);

  const handleResponse = async (accept: boolean) => {
    const res = await respondToRentDeal({ id: rentDeal.id, accept: accept });
    if (!res) {
      alert('Failed to accept rent deal');
    }
    setUpdate(update + 1);
  };

  return (
    <Card key={rentDeal.id} style={{ width: '300px' }}>
      <div>Item: {rentDeal.item.item_name}</div>
      <div>User: {rentDeal.item_user.user_name}</div>
      <div>Starts: {format(new Date(rentDeal.start_date), 'dd.MM.yyyy')}</div>
      <div>Ends: {format(new Date(rentDeal.end_date), 'dd.MM.yyyy')}</div>
      {rentDeal.status === 'PENDING' ? (
        <Stack direction="horizontal" gap={2}>
          <Button onClick={() => handleResponse(true)}>Accept</Button>
          <Button variant="danger" onClick={() => handleResponse(false)}>
            Decline
          </Button>
        </Stack>
      ) : (
        <div>{rentDeal.status}</div>
      )}
    </Card>
  );
}

export default RentDealCardReceived;
