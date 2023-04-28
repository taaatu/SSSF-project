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
    itemById: async (_parent: undefined, args: string) => {
      const id = new Types.ObjectId(args);
      return await itemModel.findById(id);
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
    deleteItem: async (
      _parent: undefined,
      args: string,
      user: UserIdWithToken
    ) => {
      const id = new Types.ObjectId(args);
      const item = (await itemModel.findById(id)) as Item;

      const userId = new Types.ObjectId(user.id);
      const ownerId = item?.owner;

      if (!user.token || (!ownerId.equals(userId) && user.role !== 'admin')) {
        console.log('not owner');
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }
      return await itemModel.findByIdAndDelete(id);
    },
  },
};
