import { GraphQLError } from 'graphql';
import { Review } from '../../interfaces/Review';
import { UserIdWithToken } from '../../interfaces/User';
import reviewModel from '../models/reviewModel';
import { Types } from 'mongoose';

export default {
  Query: {
    reviews: async () => {
      return await reviewModel.find();
    },
    reviewsByItem: async (_parent: undefined, args: string) => {
      const id = new Types.ObjectId(args);
      return await reviewModel.find({ item: id });
    },
    reviewByUser: async (
      _parent: undefined,
      args: string,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }

      const itemid = new Types.ObjectId(args);
      const userid = new Types.ObjectId(user.id);

      return await reviewModel.findOne({
        user: userid,
        item: itemid,
      });
    },
  },
  Mutation: {
    addReview: async (
      _parent: undefined,
      args: Review,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }

      const userId = user.id as unknown as Types.ObjectId;

      const duplicates = await reviewModel.find({
        user: user.id,
        item: args.item,
      });

      if (duplicates.length > 0) {
        throw new GraphQLError('Review already exists', {
          extensions: { code: 'DUPLICATE' },
        });
      }

      args.user = userId;

      const review = new reviewModel(args);
      const result = await review.save();
      return result;
    },
    deleteReview: async (
      _parent: undefined,
      args: string,
      user: UserIdWithToken
    ) => {
      const id = new Types.ObjectId(args);
      const review = (await reviewModel.findById(id)) as Review;

      const userId = new Types.ObjectId(user.id);
      const ownerId = review?.user;

      if (!user.token || (!ownerId.equals(userId) && user.role !== 'admin')) {
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }

      return await reviewModel.findByIdAndDelete(id);
    },
  },
};
