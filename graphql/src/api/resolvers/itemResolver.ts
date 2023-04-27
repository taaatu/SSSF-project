import { Types } from 'mongoose';
import { GraphQLError } from 'graphql';
import { Item } from '../../interfaces/Item';
import { UserIdWithToken } from '../../interfaces/User';
import itemModel from '../models/itemModel';

export default {
  Query: {
    items: async () => {
      return await itemModel.find();
    },
  },
  Mutation: {
    createItem: async (
      _parent: undefined,
      args: Item,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }
      args.owner = user.id as unknown as Types.ObjectId;
      const item = new itemModel(args);
      const result = await item.save();
      return result;
    },
  },
};
