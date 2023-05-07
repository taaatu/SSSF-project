import { Types } from 'mongoose';
import { Item } from './Item';
import { User } from './User';

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
  status: string;
}

interface RentDealInput {
  item: string;
  startDate: Date;
  endDate: Date;
  itemOwner: Types.ObjectId;
}

interface RentDealOutput {
  id: string;
  item: Pick<Item, 'id' | 'item_name'>;
  item_user: Pick<User, 'user_name'>;
  item_owner: Pick<User, 'user_name'>;
  status: RentDealStatus;
  start_date: Date;
  end_date: Date;
}

export type { RentDeal, RentDealInput, RentDealOutput, RentDealStatus };
