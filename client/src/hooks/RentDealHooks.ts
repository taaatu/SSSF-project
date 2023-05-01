import { useEffect, useState } from 'react';
import { doGraphQLFetch } from '../graphql/fetch';
import {
  createRentDealQuery,
  rentDealsSentQuery,
} from '../graphql/queriesRentDeal';
import { RentDeal, RentDealInput } from '../interfaces/RentDeal';
import { graphqlUrl } from '../utils/url';

const useRentDeal = () => {
  const token = localStorage.getItem('token');
  const [rentDealsSent, setRentDealsSent] = useState<RentDeal[]>();
  const createRentDeal = async (rentDeal: RentDealInput) => {
    try {
      if (!token) {
        return;
      }
      const res = await doGraphQLFetch(
        graphqlUrl,
        createRentDealQuery,
        rentDeal,
        token
      );
      console.log('createRentDeal', res);
      return res.createRentDeal;
    } catch (error) {
      console.error('create rent deal', error);
    }
  };
  const getRentDealsSent = async () => {
    try {
      if (!token) {
        return;
      }
      const res = await doGraphQLFetch(
        graphqlUrl,
        rentDealsSentQuery,
        {},
        token
      );
      setRentDealsSent(res.rentDealsSent);
    } catch (error) {
      console.error('getRentDealsSent', error);
    }
  };
  useEffect(() => {
    getRentDealsSent();
  }, []);
  return { createRentDeal, rentDealsSent };
};

export default useRentDeal;
