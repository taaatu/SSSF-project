import request from 'supertest';
import { RentDealTest } from '../src/interfaces/RentDeal';

const postRentDeal = (
  url: string | Function,
  rentDeal: RentDealTest,
  token: string
): Promise<RentDealTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation CreateRentDeal($item: ID!, $startDate: DateTime!, $endDate: DateTime!) {
              createRentDeal(item: $item, start_date: $startDate, end_date: $endDate) {
                id
                start_date
                end_date
                created_date                    
              }
            }`,
        variables: rentDeal,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const newRentDeal = response.body.data.createRentDeal;
          expect(newRentDeal).toHaveProperty('id');
          expect(newRentDeal).toHaveProperty('start_date');
          expect(newRentDeal).toHaveProperty('end_date');
          expect(newRentDeal).toHaveProperty('created_date');
          resolve(newRentDeal);
        }
      });
  });
};
export { postRentDeal };
