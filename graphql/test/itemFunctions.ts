import request from 'supertest';
import expect from 'expect';
import { ItemTest } from '../src/interfaces/Item';
import UploadMessageResponse from '../src/interfaces/UploadMessageResponse';

const postFile = (
  url: string | Function,
  token: string
): Promise<UploadMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach('item', 'graphql/test/image.png')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const uploadMessageResponse = response.body;
          expect(uploadMessageResponse).toHaveProperty('message');
          expect(uploadMessageResponse).toHaveProperty('data');
          expect(uploadMessageResponse.data).toHaveProperty('filename');
          expect(uploadMessageResponse.data).toHaveProperty('location');
          expect(uploadMessageResponse.data.location).toHaveProperty(
            'coordinates'
          );
          expect(uploadMessageResponse.data.location).toHaveProperty('type');
          resolve(uploadMessageResponse);
        }
      });
  });
};

const postItem = (
  url: string | Function,
  item: ItemTest,
  token: string
): Promise<ItemTest> => {
  return new Promise((resolve, reject) => {
    console.log('///item', item);
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation CreateItem($itemName: String!, $description: String!, $category: ID!, $filename: String!, $location: LocationInput!) {
            createItem(item_name: $itemName, description: $description, category: $category, filename: $filename, location: $location) {
              id
              item_name
              created_date
              description
              owner {
                user_name
              }
              category {
                category_name
              }
              filename
            }
          }`,
        variables: item,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const newCat = response.body.data.createItem;
          //   expect(newCat).toHaveProperty('id');
          //   expect(newCat.cat_name).toBe(cat.catName);
          //   expect(newCat.weight).toBe(cat.weight);
          //   expect(newCat).toHaveProperty('birthdate');
          //   expect(newCat.owner).toHaveProperty('user_name');
          //   expect(newCat.location).toHaveProperty('coordinates');
          //   expect(newCat.location).toHaveProperty('type');
          //   expect(newCat.filename).toBe(cat.filename);
          resolve(newCat);
        }
      });
  });
};

const userDeleteItem = (
  url: string | Function,
  id: string,
  token: string
): Promise<ItemTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation DeleteItem($deleteItemId: ID!) {
          deleteItem(id: $deleteItemId) {
            id
          }
        }`,
        variables: {
          deleteItemId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedItem = response.body.data.deleteItem;
          expect(deletedItem.id).toBe(id);
          resolve(deletedItem);
        }
      });
  });
};

export { postFile, postItem, userDeleteItem };
