import { GraphQLError } from 'graphql';
import { Item } from '../../interfaces/Item';
import { UserIdWithToken } from '../../interfaces/User';
import { RentDeal } from '../../interfaces/RentDeal';
import { Types } from 'mongoose';
import rentDealModel from '../models/rentDealModel';

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
      return await rentDealModel.find({
        item_owner: '644ec4ae5fe330a77ad529d0' as unknown as Types.ObjectId,
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
  },
};
