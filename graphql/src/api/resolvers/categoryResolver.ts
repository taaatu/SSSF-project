import { Category } from '../../interfaces/Category';
import { UserIdWithToken } from '../../interfaces/User';
import categoryModel from '../models/categoryModel';
import checkAuthorization from '../../utils/checkAuthorization';
import { Item } from '../../interfaces/Item';

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
