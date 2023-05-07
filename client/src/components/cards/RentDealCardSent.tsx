import Card from 'react-bootstrap/esm/Card';
import { RentDealOutput } from '../../interfaces/RentDeal';
import Button from 'react-bootstrap/esm/Button';
import { format } from 'date-fns';
import useRentDeal from '../../hooks/RentDealHooks';
import { useContext } from 'react';
import { MainContext } from '../../context/MainContext';

function RentDealCardSent({ rentDeal }: { rentDeal: RentDealOutput }) {
  const { deleteRentDeal } = useRentDeal(false);
  const { setUpdate, update } = useContext(MainContext);

  const handleDelete = async () => {
    const res = await deleteRentDeal(rentDeal.id);
    if (!res) {
      alert('Failed to delete rent deal');
      return;
    }
    alert('Rent deal deleted');
    setUpdate(update + 1);
  };
  return (
    <Card key={rentDeal.id} className="fit-content">
      <div>Item: {rentDeal.item.item_name}</div>
      <div>User: {rentDeal.item_owner.user_name}</div>
      <div>Starts: {format(new Date(rentDeal.start_date), 'dd.MM.yyyy')}</div>
      <div>Ends: {format(new Date(rentDeal.end_date), 'dd.MM.yyyy')}</div>
      {/* <div>End date: {rentDeal.end_date}</div> */}
      {rentDeal.status === 'PENDING' ? (
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      ) : (
        <div>{rentDeal.status}</div>
      )}
    </Card>
  );
}

export default RentDealCardSent;
