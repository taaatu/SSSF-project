import { doGraphQLFetch } from '../graphql/fetch';
import { createRentDealQuery } from '../graphql/queriesRentDeal';
import { RentDealInput } from '../interfaces/RentDeal';
import { graphqlUrl } from '../utils/url';

const useRentDeal = () => {
  const token = localStorage.getItem('token');
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
  return { createRentDeal };
};

export default useRentDeal;
