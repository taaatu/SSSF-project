import mongoose from 'mongoose';
import { Item } from '../../interfaces/Item';

const itemSchema = new mongoose.Schema<Item>({
  item_name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  created_date: {
    type: Date,
    default: Date.now,
    immutable: true,
    // required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 300,
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
