import { Category } from '../../interfaces/Category';
import { UserIdWithToken } from '../../interfaces/User';
import categoryModel from '../models/categoryModel';
import { checkAuthorization } from '../../utils/checkAuthorization';
import { Item } from '../../interfaces/Item';
import { GraphQLError } from 'graphql';
import { Types } from 'mongoose';

export default {
  Item: {
    category: async (parent: Item) => {
      return await categoryModel.findById(parent.category);
    },
  },
  Query: {
    categories: async () => {
      return await categoryModel.find();
    },
  },
  Mutation: {
    addCategory: async (
      _parent: undefined,
      args: Category,
      user: UserIdWithToken
    ) => {
      checkAuthorization(user);
      const category = new categoryModel(args);
      return await category.save();
    },
    deleteCategory: async (
      _parent: undefined,
      args: string,
      user: UserIdWithToken
    ) => {
      if (!user.token || user.role !== 'admin') {
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }
      const id = new Types.ObjectId(args);
      return await categoryModel.findByIdAndDelete(id);
    },
  },
};
