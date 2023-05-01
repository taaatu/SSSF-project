import { GraphQLError } from 'graphql';
import { Rating } from '../../interfaces/Rating';
import { UserIdWithToken } from '../../interfaces/User';
import ratingModel from '../models/ratingModel';
import { Types } from 'mongoose';

export default {
  Query: {},
  Mutation: {
    addRating: async (
      _parent: undefined,
      args: Rating,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }
      args.user = user.id as unknown as Types.ObjectId;

      const rating = new ratingModel(args);
      const result = await rating.save();
      return result;
    },
    modifyRating: async () => {},
    deleteRating: async (
      _parent: undefined,
      args: string,
      user: UserIdWithToken
    ) => {
      const id = new Types.ObjectId(args);
      const rating = (await ratingModel.findById(id)) as Rating;

      const userId = new Types.ObjectId(user.id);
      const ownerId = rating?.user;

      if (
        !user.token ||
        (!rating?.user.equals(userId) && user.role !== 'admin')
      ) {
        console.log('not owner');
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }

      return await ratingModel.findByIdAndDelete(id);
    },
  },
};
