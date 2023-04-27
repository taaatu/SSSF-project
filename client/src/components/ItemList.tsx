import { useEffect, useState } from 'react';
import { doGraphQLFetch } from '../graphql/fetch';
import { itemsQuery } from '../graphql/queriesItem';
import { graphqlUrl } from '../utils/url';
import { ItemCardData } from '../interfaces/Item';
import ItemCard from './ItemCard';

function ItemList() {
  const [items, setItems] = useState<ItemCardData[]>([]);
  const getItems = async () => {
    try {
      const res = await doGraphQLFetch(graphqlUrl, itemsQuery, {});
      setItems(res.items as ItemCardData[]);
      console.log('items res', items);
    } catch (error) {
      console.error('getItems', error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      {items.map((item) => (
        <ItemCard item={item} />
      ))}
    </div>
  );
}

export default ItemList;
