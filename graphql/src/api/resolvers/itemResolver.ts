import { Types } from 'mongoose';
import { GraphQLError } from 'graphql';
import { Item } from '../../interfaces/Item';
import { UserIdWithToken } from '../../interfaces/User';
import itemModel from '../models/itemModel';
import { RentDeal } from '../../interfaces/RentDeal';
import { Review } from '../../interfaces/Review';

export default {
  RentDeal: {
    item: async (parent: RentDeal) => {
      return await itemModel.findById(parent.item);
    },
  },
  Review: {
    item: async (parent: Review) => {
      return await itemModel.findById(parent.item);
    },
  },
  Query: {
    items: async () => {
      return await itemModel.find();
    },
    itemById: async (_parent: undefined, args: string) => {
      const id = new Types.ObjectId(args);
      return await itemModel.findById(id);
    },
    itemsByOwner: async (_parent: undefined, args: { owner: string }) => {
      const id = new Types.ObjectId(args.owner);
      return await itemModel.find({ owner: id });
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
    modifyItem: async (
      _parent: undefined,
      args: Item,
      user: UserIdWithToken
    ) => {
      const item = (await itemModel.findById(args.id)) as Item;
      if (
        !user.token ||
        (!item.owner.equals(user.id) && user.role !== 'admin')
      ) {
        throw new GraphQLError('Not authorized', {
          extensions: { code: 'NOT_AUTHORIZED' },
        });
      }
      return await itemModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
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
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }
      return await itemModel.findByIdAndDelete(id);
    },
  },
};
