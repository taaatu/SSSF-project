import mongoose from 'mongoose';
import { Rating } from '../../interfaces/Rating';

const ratingSchema = new mongoose.Schema<Rating>({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

export default mongoose.model<Rating>('Rating', ratingSchema);
