import { Point } from 'geojson';
import { Document, Types } from 'mongoose';
import { User } from './User';
import { Category } from './Category';

interface Item extends Document {
  item_name: string;
  created_date: Date;
  description: string;
  owner: Types.ObjectId;
  category: Types.ObjectId;
  location: Point;
  filename: string;
}

interface ItemTest {
  id?: string;
  item_name?: string;
  itemName?: string;
  created_date?: Date;
  createdDate?: Date;
  description?: string;
  owner?: Types.ObjectId | User;
  category?: string;
  location?: Point;
  filename?: string;
}

export { Item, ItemTest };
