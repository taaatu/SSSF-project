import { GraphQLError } from 'graphql';
import { Item } from '../../interfaces/Item';
import { UserIdWithToken } from '../../interfaces/User';
import { RentDeal, RentDealStatus } from '../../interfaces/RentDeal';
import { Types } from 'mongoose';
import rentDealModel from '../models/rentDealModel';
import { checkAuthorization } from '../../utils/checkAuthorization';
import { compareSync } from 'bcryptjs';

export default {
  Query: {
    rentDeals: async () => {
      return await rentDealModel.find();
    },
    rentDeal: async (
      _parent: undefined,
      args: string,
      user: UserIdWithToken
    ) => {},
    rentDealsReceived: async (
      _parent: undefined,
      _args: undefined,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }
      const userid = new Types.ObjectId(user.id);
      return await rentDealModel.find({
        item_owner: userid,
      });
    },
    rentDealsSent: async (
      _parent: undefined,
      _args: undefined,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }
      return await rentDealModel.find({
        item_user: user.id as unknown as Types.ObjectId,
      });
    },
  },
  Mutation: {
    createRentDeal: async (
      _parent: undefined,
      args: RentDeal,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }
      args.item_user = user.id as unknown as Types.ObjectId;
      const rentDeal = new rentDealModel(args);
      const result = await rentDeal.save();
      return result;
    },
    respondRentDeal: async (
      _parent: undefined,
      args: { id: string; accept: boolean },
      user: UserIdWithToken
    ) => {
      const id = new Types.ObjectId(args.id);
      const rentDeal = (await rentDealModel.findById(id)) as RentDeal;

      if (!rentDeal) {
        throw new GraphQLError('RentDeal not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      const userid = new Types.ObjectId(user.id);
      const isOwner = userid.equals(rentDeal.item_owner);
      const isPending = rentDeal.status === RentDealStatus.PENDING;
      if (!user.token || !isOwner || !isPending) {
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }

      const status = args.accept
        ? RentDealStatus.ACCEPTED
        : RentDealStatus.DECLINED;

      return await rentDealModel.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
      );
    },
    deleteRentDeal: async (
      _parent: undefined,
      args: string,
      user: UserIdWithToken
    ) => {
      console.log('user role', user.role);
      const userid = new Types.ObjectId(user.id);
      const rentDealId = new Types.ObjectId(args);
      const rentDeal = (await rentDealModel.findById(rentDealId)) as RentDeal;

      if (!rentDeal) {
        throw new GraphQLError('RentDeal not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      const isSender = userid.equals(rentDeal.item_user);
      const isPending = rentDeal.status === RentDealStatus.PENDING;
      if (!user.token || user.role !== 'admin') {
        if (!isSender || !isPending) {
          console.log('not authorized');
          throw new GraphQLError('Unauthorized', {
            extensions: { code: 'UNAUTHORIZED' },
          });
        }
      }
      return await rentDealModel.findByIdAndDelete(rentDealId);
    },
  },
};
