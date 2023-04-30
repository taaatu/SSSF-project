import { Types } from 'mongoose';

interface RentDeal extends Document {
  item: Types.ObjectId;
  start_date: Date;
  end_date: Date;
  created_date: Date;
  item_user: Types.ObjectId;
  item_owner: Types.ObjectId;
  status: string;
}

interface RentDealTest {
  id?: string;
  item?: Types.ObjectId;
  start_date?: Date;
  startDate?: Date;
  end_date?: Date;
  endDate?: Date;
  created_date?: Date;
  createdDate?: Date;
  item_user?: Types.ObjectId;
  itemUser?: Types.ObjectId;
  item_owner?: Types.ObjectId;
  itemOwner?: Types.ObjectId;
  status?: string;
}

export { RentDeal, RentDealTest };
