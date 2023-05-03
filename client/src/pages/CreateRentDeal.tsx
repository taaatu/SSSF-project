import { useEffect, useState } from 'react';
import React from 'react';
import useRentDeal from '../hooks/RentDealHooks';
import moment, * as Moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { RentDealInput } from '../interfaces/RentDeal';
import TopNavBar from '../components/TopNavBar';
import { useItem } from '../hooks/ItemHooks';
import mongoose from 'mongoose';
import { Item, ItemCardData } from '../interfaces/Item';
import ItemCard from '../components/ItemCard';
import Stack from 'react-bootstrap/esm/Stack';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';

function CreateRentDeal() {
  const { id } = useParams();
  const { createRentDeal } = useRentDeal();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const { getItemById } = useItem();
  const [item, setItem] = useState<Item>();
  const navigate = useNavigate();

  const getItem = async () => {
    if (id === undefined) {
      return;
    }
    setItem(await getItemById(id));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id === undefined) {
      return;
    }
    if (item === undefined) return;
    const rentDeal: RentDealInput = {
      item: id,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      itemOwner: new mongoose.Types.ObjectId(item.owner.id),
    };
    const res = await createRentDeal(rentDeal);
    if (res) {
      alert('Rent deal created');
      navigate('/');
      return;
    }
    alert('Rent deal creation failed');
    console.log('res', res);
  };
  useEffect(() => {
    getItem();
  }, []);
  return (
    <div id="rent-deal-page">
      <h1>Send rent request</h1>

      <Stack
        direction="horizontal"
        gap={3}
        style={{ alignItems: 'flex-start' }}
      >
        {item !== undefined && <ItemCard item={item as ItemCardData} />}

        <Card>
          <form onSubmit={handleSubmit}>
            <Stack gap={3}>
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
              {/* <Moment format="YYYY-MM-DD">{startDate}</Moment> */}
              {/* <div>
              end date: {endDate} start date: {startDate}
            </div> */}
              <Button type="submit">Send</Button>
            </Stack>
          </form>
        </Card>
      </Stack>
    </div>
  );
}

export default CreateRentDeal;
