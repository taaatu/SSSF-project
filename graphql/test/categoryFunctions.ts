import request from 'supertest';
import { CategoryTest } from '../src/interfaces/Category';

const postCategory = async (
  url: string | Function,
  newCategory: CategoryTest,
  token: string
): Promise<CategoryTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation Mutation($categoryName: String!) {
            addCategory(category_name: $categoryName) {
              category_name
              id
            }
          }`,
        variables: {
          categoryName: newCategory.category_name,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const category = response.body.data.addCategory as CategoryTest;
          console.log('category', category);
          console.log('token', token);
          expect(category.category_name).toBe(newCategory.category_name);
          resolve(category);
        }
      });
  });
};

export { postCategory };
