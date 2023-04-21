import request from 'supertest';
import { UserTest } from '../src/interfaces/User';
import LoginMessageResponse from '../src/interfaces/LoginMessageResponse';

const postUser = (
  url: string | Function,
  user: UserTest
): Promise<UserTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation Mutation($user: UserInput!) {
            register(user: $user) {
              message
              user {
                id
                user_name
                email
              }
            }
          }`,
        variables: {
          user: {
            user_name: user.user_name,
            email: user.email,
            password: user.password,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.register;
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('user');
          expect(userData.user).toHaveProperty('id');
          expect(userData.user.user_name).toBe(user.user_name);
          expect(userData.user.email).toBe(user.email);
          resolve(response.body.data.register);
        }
      });
  });
};

const loginUser = (
  url: string | Function,
  user: UserTest
): Promise<LoginMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation Login($credentials: Credentials!) {
          login(credentials: $credentials) {
            message
            token
            user {
              email
              id
              user_name
            }
          }
        }`,
        variables: {
          credentials: {
            username: user.email,
            password: user.password,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          console.log('login response', response.body);
          const userData = response.body.data.login;
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('token');
          expect(userData).toHaveProperty('user');
          expect(userData.user).toHaveProperty('id');
          expect(userData.user.email).toBe(user.email);
          resolve(response.body.data.login);
        }
      });
  });
};

export { postUser, loginUser };
