import request from 'supertest';
import { ReviewTest } from '../src/interfaces/Review';

const postReview = async (
  url: string | Function,
  newReview: ReviewTest,
  token: string
): Promise<ReviewTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation AddReview($item: ID!, $text: String!, $value: Int!) {
            addReview(item: $item, text: $text, value: $value) {
              id
              item {
                id
              }
              text
            }
          }`,
        variables: newReview,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const review = response.body.data.addReview as ReviewTest;
          expect(review).toHaveProperty('id');
          expect(review).toHaveProperty('item');
          expect(review).toHaveProperty('text');
          resolve(review);
        }
      });
  });
};

const userDeleteReview = (
  url: string | Function,
  id: string,
  token: string
): Promise<ReviewTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation DeleteReview($id: ID!) {
            deleteReview(id: $id) {
              id
            }
          }`,
        variables: {
          id: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedReview = response.body.data.deleteReview;
          expect(deletedReview.id).toBe(id);
          resolve(deletedReview);
        }
      });
  });
};

export { postReview, userDeleteReview };
