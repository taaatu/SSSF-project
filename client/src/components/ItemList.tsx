import { ItemCardData } from '../interfaces/Item';
import ItemCard from './cards/ItemCard';

// Component for displaying a list of items.

function ItemList(props: { items: ItemCardData[] }) {
  return (
    <div id="item-list">
      {props.items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ItemList;
