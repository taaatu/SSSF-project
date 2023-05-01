import { doGraphQLFetch } from '../graphql/fetch';
import { itemByIdQuery } from '../graphql/queriesItem';
import { Item } from '../interfaces/Item';
import { graphqlUrl } from '../utils/url';

const useItem = () => {
  const token = localStorage.getItem('token');
  const getItemById = async (id: string) => {
    try {
      if (!token) {
        return;
      }
      const res = await doGraphQLFetch(graphqlUrl, itemByIdQuery, { id });
      return res.itemById as Item;
    } catch (error) {
      console.error('getItemById', error);
    }
  };
  return { getItemById };
};

export { useItem };
