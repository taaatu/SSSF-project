import { useContext, useEffect, useState } from 'react';
import { doGraphQLFetch } from '../graphql/fetch';
import {
  createRentDealQuery,
  deleteRentDealQuery,
  rentDealsReceivedQuery,
  rentDealsSentQuery,
  respondRentDealQuery,
} from '../graphql/queriesRentDeal';
import { RentDealInput, RentDealOutput } from '../interfaces/RentDeal';
import { graphqlUrl } from '../utils/url';
import { MainContext } from '../context/MainContext';

const useRentDeal = (fetchData = true) => {
  const token = localStorage.getItem('token');
  const [rentDealsSent, setRentDealsSent] = useState<RentDealOutput[]>([]);
  const [rentDealsReceived, setRentDealsReceived] = useState<RentDealOutput[]>(
    []
  );
  const { update } = useContext(MainContext);

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
      return res.createRentDeal;
    } catch (error) {
      console.error('create rent deal', error);
    }
  };
  const respondToRentDeal = async (args: { id: string; accept: boolean }) => {
    try {
      if (!token) return;
      const res = await doGraphQLFetch(
        graphqlUrl,
        respondRentDealQuery,
        args,
        token
      );
      return res.respondRentDeal as RentDealOutput;
    } catch (error) {
      console.error('respond to rent deal', error);
    }
  };
  const getRentDealsSent = async () => {
    try {
      if (!token) return;

      const res = await doGraphQLFetch(
        graphqlUrl,
        rentDealsSentQuery,
        {},
        token
      );
      const data = res.rentDealsSent;
      if (!data) return;
      setRentDealsSent(data as RentDealOutput[]);
    } catch (error) {
      console.error('getRentDealsSent', error);
    }
  };
  const getRentDealsReceived = async () => {
    try {
      if (!token) return;
      const res = await doGraphQLFetch(
        graphqlUrl,
        rentDealsReceivedQuery,
        {},
        token
      );
      const data = res.rentDealsReceived as RentDealOutput[];
      if (!data) return;
      setRentDealsReceived(data);
    } catch (error) {
      console.error('rent deals received', error);
    }
  };
  const deleteRentDeal = async (rentDealId: string) => {
    try {
      if (!token) return;
      const res = await doGraphQLFetch(
        graphqlUrl,
        deleteRentDealQuery,
        {
          id: rentDealId,
        },
        token
      );
      return res.deleteRentDeal as RentDealOutput;
    } catch (error) {
      console.error('delete rent deal', error);
    }
  };

  useEffect(() => {
    if (!fetchData) return;
    getRentDealsSent();
    getRentDealsReceived();
  }, [update]);

  return {
    createRentDeal,
    rentDealsSent,
    rentDealsReceived,
    respondToRentDeal,
    deleteRentDeal,
  };
};

export default useRentDeal;
