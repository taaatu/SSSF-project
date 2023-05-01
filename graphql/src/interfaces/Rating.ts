import { Document, Types } from 'mongoose';
import { User } from './User';

interface Rating extends Document {
  item: Types.ObjectId;
  user: Types.ObjectId;
  value: number;
}

interface RatingTest {
  id?: string;
  item?: Types.ObjectId;
  user?: string | User;
  value?: number;
}

export { Rating, RatingTest };
