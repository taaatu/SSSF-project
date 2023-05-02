import { Document, Types } from 'mongoose';
import { User } from './User';

interface Review extends Document {
  item: Types.ObjectId;
  text: string;
  user: Types.ObjectId;
  value: number;
}

interface ReviewTest {
  id?: string;
  item?: Types.ObjectId;
  text?: string;
  user?: string | User;
  value?: number;
}

export { Review, ReviewTest };
