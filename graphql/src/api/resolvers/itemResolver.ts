import { Types } from 'mongoose';
import { GraphQLError } from 'graphql';
import { Item } from '../../interfaces/Item';
import { UserIdWithToken } from '../../interfaces/User';
import itemModel from '../models/itemModel';

export default {
  Query: {},
  Mutation: {
    createItem: async (
      _parent: undefined,
      args: Item,
      user: UserIdWithToken
    ) => {
      console.log('///createItem', args);
      if (!user.token) {
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }
      args.owner = user.id as unknown as Types.ObjectId;
      args.owner = '6441a68e5ea63ea87229b446' as unknown as Types.ObjectId;
      const item = new itemModel(args);
      const result = await item.save();
      return result;
    },
  },
};
