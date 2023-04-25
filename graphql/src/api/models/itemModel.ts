import mongoose from 'mongoose';
import { Item } from '../../interfaces/Item';

const itemSchema = new mongoose.Schema<Item>({
  item_name: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  filename: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Item>('Item', itemSchema);
