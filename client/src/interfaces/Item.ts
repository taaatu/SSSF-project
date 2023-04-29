import { Point } from 'geojson';
import { Document } from 'mongoose';
import { User } from './User';
import { Category } from './Category';

interface Item extends Document {
  item_name: string;
  created_date: Date;
  description: string;
  owner: Pick<User, 'user_name'>;
  category: Category;
  // location: Point;
  filename: string;
}

interface ItemInput {
  itemName: string;
  description: string;
  category: string;
  location: Point;
  filename: string;
}

interface ItemCardData {
  id: string;
  item_name: string;
  created_date: Date;
  owner: Pick<User, 'user_name'>;
  category: Pick<Category, 'category_name'>;
  filename: string;
}

export type { Item, ItemInput, ItemCardData };
