import { Point } from 'geojson';
import { Document, Types } from 'mongoose';

interface Item extends Document {
  item_name: string;
  created_date: Date;
  description: string;
  owner: Types.ObjectId;
  category: Types.ObjectId;
  location: Point;
  filename: string;
}

interface ItemInput {
  itemName: string;
  description: string;
  category: string;
  location: Point;
  filename: string;
}

export type { Item, ItemInput };
