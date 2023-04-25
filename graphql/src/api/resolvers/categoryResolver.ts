import { GraphQLError } from 'graphql';
import { Category } from '../../interfaces/Category';
import { UserIdWithToken } from '../../interfaces/User';
import categoryModel from '../models/categoryModel';
import checkAuthorization from '../../utils/checkAuthorization';

export default {
  Query: {},
  Mutation: {
    addCategory: async (
      parent: undefined,
      args: Category,
      user: UserIdWithToken
    ) => {
      checkAuthorization(user);
      const category = new categoryModel(args);
      return await category.save();
    },
  },
};
