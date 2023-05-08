import { useState, useEffect } from 'react';
import ItemList from '../components/ItemList';
import { useItem } from '../hooks/ItemHooks';
import { ItemCardData } from '../interfaces/Item';
import '../styles.css';

// App's home page which displays all the items

function Home() {
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
    <div id="home-page">
      <h1>Home</h1>
      <ItemList items={items} />
    </div>
  );
}

export default Home;
