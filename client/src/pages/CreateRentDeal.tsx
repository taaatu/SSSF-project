import { useState } from 'react';
import useRentDeal from '../hooks/RentDealHooks';
import { useParams } from 'react-router-dom';
import { RentDealInput } from '../interfaces/RentDeal';
import TopNavBar from '../components/TopNavBar';

function CreateRentDeal() {
  const { id } = useParams();
  const { createRentDeal } = useRentDeal();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id === undefined) {
      return;
    }
    const rentDeal: RentDealInput = {
      item: id,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };
    const res = await createRentDeal(rentDeal);
    if (res) {
      alert('Rent deal created');
      return;
    }
    alert('Rent deal creation failed');
    console.log('res', res);
  };
  return (
    <div>
      <TopNavBar />
      <h1>Create Rent Deal</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Start date:
          <input
            type="date"
            required
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End date:
          <input
            type="date"
            required
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <div>
          end date: {endDate} start date: {startDate}
        </div>
        <input type="submit" value="Send rent request" />
      </form>
    </div>
  );
}

export default CreateRentDeal;
