import mongoose from 'mongoose';
import { RentDeal, RentDealStatus } from '../../interfaces/RentDeal';

const rentDealSchema = new mongoose.Schema<RentDeal>({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  item_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  item_owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: RentDealStatus,
    default: RentDealStatus.PENDING,
    required: true,
  },
});

export default mongoose.model<RentDeal>('Rent_deal', rentDealSchema);
