import { ItemCardData } from '../interfaces/Item';
import { fileUrl } from '../utils/url';

function ItemCard({ item }: { item: ItemCardData }) {
  return (
    <div className="item-card">
      <div>{item.item_name}</div>
      <img src={`${fileUrl}${item.filename}`}></img>
    </div>
  );
}

export default ItemCard;
