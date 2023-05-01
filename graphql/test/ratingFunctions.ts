import request from 'supertest';
import { RatingTest } from '../src/interfaces/Rating';

const postRating = async (
  url: string | Function,
  newRating: RatingTest,
  token: string
): Promise<RatingTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation AddRating($item: ID!, $value: Int!) {
            addRating(item: $item, value: $value) {
              id
            }
          }`,
        variables: newRating,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const rating = response.body.data.addRating as RatingTest;
          expect(rating).toHaveProperty('id');
          //   expect(rating.item).toBe(newRating.item);
          resolve(rating);
        }
      });
  });
};

const userDeleteRating = (
  url: string | Function,
  id: string,
  token: string
): Promise<RatingTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation DeleteRating($id: ID!) {
            deleteRating(id: $id) {
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
          const deletedRating = response.body.data.deleteRating;
          expect(deletedRating.id).toBe(id);
          resolve(deletedRating);
        }
      });
  });
};

export { postRating, userDeleteRating };
