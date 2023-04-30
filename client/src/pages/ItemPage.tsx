import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { doGraphQLFetch } from '../graphql/fetch';
import { fileUrl, graphqlUrl } from '../utils/url';
import { deleteItemQuery, itemByIdQuery } from '../graphql/queriesItem';
import { Item } from '../interfaces/Item';
import TopNavBar from '../components/TopNavBar';
import ShowLocation from '../components/ShowLocation';

function ItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item>();
  const [showLocation, setShowLocation] = useState<boolean>(false);

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
      <h1>ID: {id}</h1>
      <img src={`${fileUrl}${item.filename}`}></img>
      <p>{item.item_name}</p>
      <p>{item.description}</p>
      <p>owner: {item.owner.user_name}</p>
      <div>
        owner:{' '}
        <Link to={`/profile/${item.owner.user_name}`}>
          {item.owner.user_name}
        </Link>
      </div>
      <button onClick={() => setShowLocation(true)}>Show location</button>
      {showLocation && (
        <ShowLocation
          setIsMapOpen={setShowLocation}
          coordinates={item.location.coordinates}
        />
      )}
      <p>category: {item.category.category_name}</p>
      {id !== undefined && <DeleteButton itemId={id} />}
      <button onClick={() => navigate(`/item/modify/${id}`)}>Modify</button>
      <button onClick={() => navigate(`/item/rent/${id}`)}>Ask for rent</button>
    </div>
  );
}

const DeleteButton = ({ itemId }: { itemId: string }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token === null) {
        alert('Please login first');
        return;
      }
      const res = await doGraphQLFetch(
        graphqlUrl,
        deleteItemQuery,
        {
          id: itemId,
        },
        token
      );
      if (res.deleteItem) {
        alert('Item deleted');
        navigate('/');
        return;
      }
      alert('Failed to delete item');
    } catch (error) {
      console.error('deleteItem', error);
    }
  };
  return <button onClick={handleClick}>Delete</button>;
};

export default ItemPage;
