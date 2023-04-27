import { ItemCardData } from '../interfaces/Item';

function ItemCard({ item }: { item: ItemCardData }) {
  return (
    <div className="item-card">
      <div>{item.item_name}</div>
    </div>
  );
}

export default ItemCard;
