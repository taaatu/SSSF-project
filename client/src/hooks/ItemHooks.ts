import { doGraphQLFetch } from '../graphql/fetch';
import {
  createItemQuery,
  deleteItemQuery,
  itemByIdQuery,
  itemsByUserQuery,
  itemsQuery,
  modifyItemQuery,
} from '../graphql/queriesItem';
import { Item, ItemInput, ModifyItemInput } from '../interfaces/Item';
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
  const getItems = async () => {
    try {
      const res = await doGraphQLFetch(graphqlUrl, itemsQuery, {});
      return res.items as Item[];
    } catch (error) {
      console.error('get items', error);
    }
  };
  const getItemById = async (id: string) => {
    try {
      const res = await doGraphQLFetch(graphqlUrl, itemByIdQuery, { id });
      return res.itemById as Item;
    } catch (error) {
      console.error('item by id', error);
    }
  };
  const getItemsByUser = async (itemId: string) => {
    try {
      const res = await doGraphQLFetch(graphqlUrl, itemsByUserQuery, {
        id: itemId,
      });
      console.log(res);
      if (!res.itemsByOwner) return [];
      return res.itemsByOwner as Item[];
    } catch (error) {
      console.error('items by user', error);
      return [];
    }
  };
  const modifyItem = async (data: ModifyItemInput) => {
    try {
      if (!token) return;
      const res = await doGraphQLFetch(
        graphqlUrl,
        modifyItemQuery,
        data,
        token
      );
      return res.modifyItem as Item;
    } catch (error) {
      console.error('modify item', error);
    }
  };
  const deleteItem = async (itemId: string) => {
    try {
      if (!token) return;
      const res = await doGraphQLFetch(
        graphqlUrl,
        deleteItemQuery,
        {
          id: itemId,
        },
        token
      );
      return res.deleteItem as Item;
    } catch (error) {
      console.error('delete item', error);
    }
  };
  return {
    getItemById,
    createItem,
    getItems,
    deleteItem,
    modifyItem,
    getItemsByUser,
  };
};

export { useItem };
