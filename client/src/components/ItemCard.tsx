import { useNavigate } from 'react-router-dom';
import { ItemCardData } from '../interfaces/Item';
import { fileUrl } from '../utils/url';
import Card from 'react-bootstrap/Card';
import ShowAvgReview from './ShowAvgReview';

// A component that displays the preview of an item. Takes item data as props.
// When clicked, it will navigate to the item page.

function ItemCard({ item }: { item: ItemCardData }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/item/${item.id}`);
  };
  return (
    <Card
      className="item-card"
      style={{ width: '18rem' }}
      onClick={handleClick}
    >
      <ShowAvgReview itemId={item.id} partial={true} />
      <Card.Img
        variant="top"
        className="card-img"
        src={`${fileUrl}${item.filename}_thumb`}
      />
      <Card.Body>
        <Card.Title>{item.item_name}</Card.Title>
        <Card.Text>
          Category: {item.category.category_name} <br />
          Owner: {item.owner.user_name}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ItemCard;
