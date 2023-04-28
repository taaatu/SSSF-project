import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doGraphQLFetch } from '../graphql/fetch';
import { fileUrl, graphqlUrl } from '../utils/url';
import { itemByIdQuery } from '../graphql/queriesItem';
import { Item } from '../interfaces/Item';
import TopNavBar from '../components/TopNavBar';

function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState<Item>();

  const getItem = async () => {
    try {
      const res = await doGraphQLFetch(graphqlUrl, itemByIdQuery, { id });
      setItem(res.itemById as Item);
    } catch (error) {
      console.error('getItem', error);
    }
  };
  useEffect(() => {
    getItem();
  }, []);

  if (item === undefined) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <TopNavBar />
      <img src={`${fileUrl}${item.filename}`}></img>
      <p>{item.item_name}</p>
      <p>{item.description}</p>
      <p>owner: {item.owner.user_name}</p>
      <p>category: {item.category.category_name}</p>
    </div>
  );
}

export default ItemPage;
