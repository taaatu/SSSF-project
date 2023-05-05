import app from '../src/app';
import mongoose from 'mongoose';
import randomstring from 'randomstring';
import { UserTest } from '../src/interfaces/User';
import { deleteUser, loginUser, postUser } from './userFunctions';
import LoginMessageResponse from '../src/interfaces/LoginMessageResponse';
import { Item, ItemTest } from '../src/interfaces/Item';
import UploadMessageResponse from '../src/interfaces/UploadMessageResponse';
import { CategoryTest } from '../src/interfaces/Category';
import { deleteCategory, postCategory } from './categoryFunctions';
import {
  postFile,
  postItem,
  userDeleteItem,
  userPutItem,
} from './itemFunctions';
import { Point } from 'geojson';
import { RentDealTest } from '../src/interfaces/RentDeal';
import { postRentDeal } from './rentDealDunctions';
import { ReviewTest } from '../src/interfaces/Review';
import { postReview, userDeleteReview } from './reviewFunctions';

const uploadApp = process.env.UPLOAD_URL as string;

describe('Testing graphql api', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const testUser: UserTest = {
    user_name: 'TestUser' + randomstring.generate(7),
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

  let userAdmin: LoginMessageResponse;
  it('should login as admin', async () => {
    const data: UserTest = {
      email: 'admin@test.com',
      password: process.env.ADMIN_PW,
    };
    userAdmin = await loginUser(app, data);
  });

  let testCategory: CategoryTest = {
    category_name: 'test category' + randomstring.generate(7),
  };
  it('should create a new category', async () => {
    testCategory = await postCategory(app, testCategory, userData.token!);
  });

  let uploadData: UploadMessageResponse;
  let itemData: ItemTest;
  let testItem: Item;

  // test upload file
  it('should upload a file', async () => {
    uploadData = await postFile(uploadApp, userData.token!);
  });
  const testLocation = {
    type: 'Point',
    coordinates: [24.9384, 60.1699],
  } as Point;

  // test create item
  let itemId: string;
  it('should create an item', async () => {
    itemData = {
      itemName: 'Test Item ' + randomstring.generate(7),
      description: 'This is a test item',
      category: testCategory.id,
      filename: 'testfile.jpg',
      location: testLocation,
    };
    const item = await postItem(app, itemData, userData.token!);
    console.log('create test', item);
    testItem = item as unknown as Item;
    itemId = item.id!;
  });

  it('should modify an item', async () => {
    const newItem: ItemTest = {
      itemName: 'Modified Test Item ' + randomstring.generate(7),
      description: 'This is a modified test item',
    };
    await userPutItem(app, newItem, itemId, userData.token!);
  });

  it('admin should modify item', async () => {
    const newItem: ItemTest = {
      itemName: 'Modified Test Item ' + randomstring.generate(7),
      description: 'This is a modified test item',
    };
    await userPutItem(app, newItem, itemId, userAdmin.token!);
  });

  it('should create a rent deal', async () => {
    const rentDeal: RentDealTest = {
      item: new mongoose.Types.ObjectId(itemId),
      startDate: new Date('2021-04-20'),
      endDate: new Date('2021-04-30'),
      itemOwner: new mongoose.Types.ObjectId(testItem.owner.id),
    };
    await postRentDeal(app, rentDeal, userData.token!);
  });

  let reviewId: string;
  it('should add a review', async () => {
    const testReview: ReviewTest = {
      item: new mongoose.Types.ObjectId(itemId),
      text: 'This is a test review',
      value: 4,
    };
    const res = await postReview(app, testReview, userData.token!);
    reviewId = res.id!;
  });

  it('should delete review', async () => {
    await userDeleteReview(app, reviewId, userData.token!);
  });

  it('should delete an item', async () => {
    await userDeleteItem(app, itemId, userData.token!);
  });

  it('should delete a category', async () => {
    await deleteCategory(app, testCategory.id!, userAdmin.token!);
  });

  it('should delete current user', async () => {
    await deleteUser(app, userData.token!);
  });
});
