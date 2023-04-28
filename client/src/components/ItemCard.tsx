import { useNavigate } from 'react-router-dom';
import { ItemCardData } from '../interfaces/Item';
import { fileUrl } from '../utils/url';

function ItemCard({ item }: { item: ItemCardData }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/item/${item.id}`);
  };
  return (
    <div className="item-card" onClick={handleClick}>
      <div>{item.item_name}</div>
      <img src={`${fileUrl}${item.filename}`}></img>
    </div>
  );
}

export default ItemCard;
