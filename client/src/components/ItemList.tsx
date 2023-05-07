import { useEffect, useState } from 'react';
import { ItemCardData } from '../interfaces/Item';
import ItemCard from './cards/ItemCard';
import { useItem } from '../hooks/ItemHooks';

// Component for displaying a list of items.

function ItemList() {
  const { getItems } = useItem();
  const [items, setItems] = useState<ItemCardData[]>([]);

  const fetchItems = async () => {
    const res = (await getItems()) as ItemCardData[];
    setItems(res);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div id="item-list">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ItemList;
