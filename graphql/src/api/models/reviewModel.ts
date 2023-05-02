import mongoose from 'mongoose';
import { Review } from '../../interfaces/Review';

const reviewSchema = new mongoose.Schema<Review>({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  text: {
    type: String,
    maxlength: 300,
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

export default mongoose.model<Review>('Review', reviewSchema);
