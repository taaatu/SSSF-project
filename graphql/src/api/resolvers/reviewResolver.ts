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
      // console.log('///reviewByUserAndItem', { args: args, user: user.id });
      console.log('///ARGS', args);
      // console.log('///USER', user);
      if (!user.token) {
        console.log('///no token');
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }

      // console.log('///here', args);
      const itemid = new Types.ObjectId(args);
      const userid = new Types.ObjectId(user.id);
      // console.log('///itemid', itemid);

      // const t = await reviewModel.find({
      //   item: itemid,
      // });
      // console.log('///t', t);
      // return t[0];
      // return await reviewModel.find();
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
        console.log('duplicates found');
        console.log(duplicates[0]);
        return;
      }

      args.user = userId;

      const review = new reviewModel(args);
      const result = await review.save();
      return result;
    },
    modifyReview: async () => {},
    deleteReview: async (
      _parent: undefined,
      args: string,
      user: UserIdWithToken
    ) => {
      const id = new Types.ObjectId(args);
      const review = (await reviewModel.findById(id)) as Review;

      const userId = new Types.ObjectId(user.id);
      const ownerId = review?.user;

      if (
        !user.token ||
        (!review?.user.equals(userId) && user.role !== 'admin')
      ) {
        console.log('not owner');
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }

      return await reviewModel.findByIdAndDelete(id);
    },
  },
};
