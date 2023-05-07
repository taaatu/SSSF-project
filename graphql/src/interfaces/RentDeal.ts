import { Types } from 'mongoose';

enum RentDealStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  RETURNED = 'RETURNED',
}

interface RentDeal extends Document {
  item: Types.ObjectId;
  start_date: Date;
  end_date: Date;
  created_date: Date;
  item_user: Types.ObjectId;
  item_owner: Types.ObjectId;
  status: RentDealStatus;
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
  status?: RentDealStatus;
}

export { RentDeal, RentDealTest, RentDealStatus };
