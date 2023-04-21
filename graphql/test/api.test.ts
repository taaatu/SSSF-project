import app from '../src/app';
import mongoose from 'mongoose';
import randomstring from 'randomstring';
import { UserTest } from '../src/interfaces/User';
import { loginUser, postUser } from './userFunctions';
import LoginMessageResponse from '../src/interfaces/LoginMessageResponse';

describe('Testing graphql api', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const testUser: UserTest = {
    user_name: 'Test User ' + randomstring.generate(7),
    email: randomstring.generate(9) + '@user.fi',
    password: 'testpassword',
  };

  let userData: LoginMessageResponse;

  // create first user
  it('should create a new user', async () => {
    await postUser(app, testUser);
  });

  // test login
  it('should login user', async () => {
    userData = await loginUser(app, testUser);
  });
});
