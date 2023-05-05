import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fileUrl } from '../utils/url';
import { Item } from '../interfaces/Item';
import ShowLocation from '../components/ShowLocation';
import { Button, Card } from 'react-bootstrap';
import useUser from '../hooks/UserHook';
import ItemReviews from '../components/ItemReview';
import ShowAvgReview from '../components/ShowAvgReview';
import { useItem } from '../hooks/ItemHooks';

// Page to show the details of an item

function ItemPage() {
  const { id } = useParams();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const { getItemById } = useItem();

  const [item, setItem] = useState<Item>();
  const [showLocation, setShowLocation] = useState<boolean>(false);

  const getItem = async () => {
    if (id === undefined) return;
    const res = await getItemById(id);
    setItem(res);
  };

  useEffect(() => {
    getItem();
  }, []);

  if (item === undefined || id === undefined) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <Card id="item-page">
        <Card id="item-info" className="flex-row">
          <Card.Img id="item-img" src={`${fileUrl}${item.filename}`} />
          <Card.Body id="item-body">
            <h2>{item.item_name}</h2>
            <p>{item.description}</p>
            <div>
              owner:{' '}
              <Link to={`/profile/${item.owner.user_name}`}>
                {item.owner.user_name}
              </Link>
              <div>category: {item.category.category_name}</div>
            </div>
            <Button variant="secondary" onClick={() => setShowLocation(true)}>
              Show location
            </Button>
            {showLocation && (
              <ShowLocation
                setIsMapOpen={setShowLocation}
                coordinates={item.location.coordinates}
              />
            )}

            <div className="flex-row" style={{ gap: '10px' }}>
              {id !== undefined &&
                (currentUser?.role === 'admin' ||
                  item.owner.id === currentUser?.id) && (
                  <>
                    <DeleteButton itemId={id} />
                    <Button onClick={() => navigate(`/item/modify/${id}`)}>
                      Modify
                    </Button>
                  </>
                )}
              {item.owner.id !== currentUser?.id && (
                <Button onClick={() => navigate(`/item/rent/${id}`)}>
                  Ask for rent
                </Button>
              )}
            </div>
          </Card.Body>
          <ShowAvgReview itemId={id} />
        </Card>
        <ItemReviews itemId={id} />
      </Card>
    </div>
  );
}

// Button for deleting the item
const DeleteButton = ({ itemId }: { itemId: string }) => {
  const navigate = useNavigate();
  const { deleteItem } = useItem();

  const handleClick = async () => {
    const token = localStorage.getItem('token');
    if (token === null) {
      alert('Please login first');
      return;
    }

    const deletedItem = await deleteItem(itemId);
    if (deletedItem) {
      alert('Item deleted');
      navigate('/');
      return;
    }
    alert('Failed to delete item');
  };

  return (
    <Button variant="danger" onClick={handleClick}>
      Delete
    </Button>
  );
};

export default ItemPage;
