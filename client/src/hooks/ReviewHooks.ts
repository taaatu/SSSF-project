import { doGraphQLFetch } from '../graphql/fetch';
import {
  addReviewQuery,
  reviewByUserQuery,
  reviewsByItemQuery,
} from '../graphql/queriesReview';
import { Review, ReviewInput } from '../interfaces/Review';
import { graphqlUrl } from '../utils/url';

const useReviews = () => {
  const token = localStorage.getItem('token');
  const getReviewsByItem = async (id: string) => {
    try {
      const res = await doGraphQLFetch(graphqlUrl, reviewsByItemQuery, {
        id: id,
      });
      console.log('getReviewsByItem', res.reviewsByItem);
      return res.reviewsByItem as Review[];
    } catch (error) {
      console.error('getReviewsByItem', error);
    }
  };
  const getReviewByUser = async (itemid: string) => {
    try {
      if (!token) return;
      const res = await doGraphQLFetch(
        graphqlUrl,
        reviewByUserQuery,
        {
          itemid: itemid,
        },
        token
      );
      console.log('getReviewByUser', res);
      return res.reviewByUser as Review;
    } catch (error) {
      console.error('getReviewByUser', error);
    }
  };
  const addReview = async (data: ReviewInput) => {
    try {
      console.log('addReview data', data);
      if (!token) return console.error('no token');
      const res = await doGraphQLFetch(graphqlUrl, addReviewQuery, data, token);
      console.log('addReview', res);
      return res.addReview as Review;
    } catch (error) {
      console.error('addReview', error);
    }
  };
  return { getReviewsByItem, getReviewByUser, addReview };
};

export { useReviews };
