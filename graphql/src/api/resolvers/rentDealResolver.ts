import { GraphQLError } from 'graphql';
import { Item } from '../../interfaces/Item';
import { UserIdWithToken } from '../../interfaces/User';
import { RentDeal } from '../../interfaces/RentDeal';
import { Types } from 'mongoose';
import rentDealModel from '../models/rentDealModel';

export default {
  Query: {},
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
