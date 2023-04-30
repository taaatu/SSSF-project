import { Types } from 'mongoose';

interface RentDeal extends Document {
  item: Types.ObjectId;
  start_date: Date;
  end_date: Date;
  created_date: Date;
  item_user: Types.ObjectId;
  status: string;
}

interface RentDealInput {
  item: string;
  startDate: Date;
  endDate: Date;
}

export type { RentDeal, RentDealInput };
