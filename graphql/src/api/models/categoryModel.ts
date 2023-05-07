import mongoose from 'mongoose';
import { Category } from '../../interfaces/Category';

const categorySchema = new mongoose.Schema<Category>({
  category_name: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
  },
});

// Create model for category
export default mongoose.model<Category>('Category', categorySchema);
