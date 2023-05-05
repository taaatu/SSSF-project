import { doGraphQLFetch } from '../graphql/fetch';
import {
  addReviewQuery,
  deleteReviewQuery,
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
      return res.reviewByUser as Review;
    } catch (error) {
      console.error('getReviewByUser', error);
    }
  };
  const addReview = async (data: ReviewInput) => {
    try {
      if (!token) return console.error('no token');
      const res = await doGraphQLFetch(graphqlUrl, addReviewQuery, data, token);
      return res.addReview as Review;
    } catch (error) {
      console.error('addReview', error);
    }
  };
  const deleteReview = async (id: string) => {
    try {
      if (!token) return;
      const res = await doGraphQLFetch(
        graphqlUrl,
        deleteReviewQuery,
        { id: id },
        token
      );
      return res.deleteReview as Review;
    } catch (error) {
      throw new Error('deleteReview ' + error);
    }
  };
  return { getReviewsByItem, getReviewByUser, addReview, deleteReview };
};

export { useReviews };
