import app from '../src/app';
import mongoose from 'mongoose';
import randomstring from 'randomstring';
import { UserTest } from '../src/interfaces/User';
import { loginUser, postUser } from './userFunctions';
import LoginMessageResponse from '../src/interfaces/LoginMessageResponse';
import { ItemTest } from '../src/interfaces/Item';
import UploadMessageResponse from '../src/interfaces/UploadMessageResponse';
import { Category, CategoryTest } from '../src/interfaces/Category';
import { postCategory } from './categoryFunctions';
import { postFile, postItem } from './itemFunctions';
import { locationInput } from '../src/interfaces/Location';

const uploadApp = process.env.UPLOAD_URL as string;

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

  let testCategory: CategoryTest = {
    category_name: 'test category' + randomstring.generate(7),
  };
  it('should create a new category', async () => {
    testCategory = await postCategory(app, testCategory, userData.token!);
  });

  let uploadData: UploadMessageResponse;
  let itemData: ItemTest;

  it('should upload a cat', async () => {
    uploadData = await postFile(uploadApp, userData.token!);
    // catData1 = {
    //   catName: 'Test Cat' + randomstring.generate(7),
    //   weight: 5,
    //   birthdate: new Date('2022-01-01'),
    //   filename: uploadData1.data.filename,
    //   location: uploadData1.data.location,
    // };
  });

  it('should create an item', async () => {
    itemData = {
      itemName: 'Test Item ' + randomstring.generate(7),
      createdDate: new Date(),
      description: 'This is a test item',
      category: testCategory.id,
      filename: 'testfile.jpg',
    };
    const item = await postItem(app, itemData, userData.token!);
    console.log(item);
  });
});
