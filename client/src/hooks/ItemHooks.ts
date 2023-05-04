import { doGraphQLFetch } from '../graphql/fetch';
import { createItemQuery, itemByIdQuery } from '../graphql/queriesItem';
import { Item, ItemInput } from '../interfaces/Item';
import { graphqlUrl } from '../utils/url';

const useItem = () => {
  const token = localStorage.getItem('token');
  const createItem = async (data: ItemInput) => {
    try {
      if (!token) return;
      const res = await doGraphQLFetch(
        graphqlUrl,
        createItemQuery,
        data,
        token
      );
      return res.createItem;
    } catch (error) {
      console.error('create item', error);
    }
  };
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
  return { getItemById, createItem };
};

export { useItem };
