import request from 'supertest';
import { RentDealStatus, RentDealTest } from '../src/interfaces/RentDeal';

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
        query: `mutation CreateRentDeal($item: ID!, $startDate: DateTime!, $endDate: DateTime!, $itemOwner: ID!) {
              createRentDeal(item: $item, start_date: $startDate, end_date: $endDate, item_owner: $itemOwner) {
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

const respondRentDeal = (
  url: string | Function,
  args: { id: string; accept: boolean },
  token: string
): Promise<RentDealTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation RespondRentDeal($id: ID!, $accept: Boolean!) {
          respondRentDeal(id: $id, accept: $accept) {
            id
            item {
              item_name
            }
            status
          }
        }`,
        variables: {
          id: args.id,
          accept: args.accept,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const acceptResponse = response.body.data.respondRentDeal;
          expect(acceptResponse).toHaveProperty('id');
          expect(acceptResponse).toHaveProperty('item');
          expect(acceptResponse).toHaveProperty('status');
          args.accept &&
            expect(acceptResponse.status).toBe(RentDealStatus.ACCEPTED);
          !args.accept &&
            expect(acceptResponse.status).toBe(RentDealStatus.DECLINED);
          resolve(acceptResponse);
        }
      });
  });
};

const deleteRentDeal = (
  url: string | Function,
  id: string,
  token: string
): Promise<RentDealTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
        mutation DeleteRentDeal($deleteRentDealId: ID!) {
          deleteRentDeal(id: $deleteRentDealId) {
            id
          }
        }`,
        variables: {
          deleteRentDealId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedRentDeal = response.body.data.deleteRentDeal;
          expect(deletedRentDeal).toHaveProperty('id');
          expect(deletedRentDeal.id).toBe(id);
          resolve(deletedRentDeal);
        }
      });
  });
};

export { postRentDeal, respondRentDeal, deleteRentDeal };
