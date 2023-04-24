import { GraphQLError } from 'graphql';
import { Category } from '../../interfaces/Category';
import { UserIdWithToken } from '../../interfaces/User';
import categoryModel from '../models/categoryModel';

export default {
  Query: {},
  Mutation: {
    addCategory: async (
      parent: undefined,
      args: Category,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }
      const category = new categoryModel(args);
      return await category.save();
    },
  },
};
