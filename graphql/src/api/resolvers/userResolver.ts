import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import {
  User,
  UserIdWithToken,
  UserNameId,
  UserOutPut,
} from '../../interfaces/User';
import LoginMessageResponse from '../../interfaces/LoginMessageResponse';
import { Item } from '../../interfaces/Item';
import { RentDeal } from '../../interfaces/RentDeal';
import { Review } from '../../interfaces/Review';
// import getUser from '../../utils/getUser';
import userModel from '../models/userModel';
import { Credentials } from '../../interfaces/Credentials';
import { Types } from 'mongoose';
import {
  CheckTokenResponse,
  UserMessageResponse,
} from '../../interfaces/UserMessageResponse';

const salt = bcrypt.genSaltSync(12);

const getUser = async (id: Types.ObjectId) => {
  const user = (await userModel.findById(id)) as UserOutPut;
  if (!user) {
    throw new GraphQLError('User not found', {
      extensions: { code: 'NOT_FOUND' },
    });
  }
  return user;
};

export default {
  Item: {
    owner: async (parent: Item) => {
      return await getUser(parent.owner);
    },
  },
  RentDeal: {
    item_user: async (parent: RentDeal) => {
      return await getUser(parent.item_user);
    },
  },
  Review: {
    user: async (parent: Review) => {
      return await getUser(parent.user);
    },
  },
  Query: {
    userByUsername: async (_parent: unknown, args: { username: string }) => {
      const user = (await userModel.findOne({
        user_name: args.username,
      })) as UserNameId;
      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }
      return user;
    },
    checkToken: async (
      _parent: unknown,
      _args: unknown,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Token invalid', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }
      const response: CheckTokenResponse = {
        message: 'Token valid',
        user: {
          id: user.id,
          role: user.role,
        },
      };
      return response;
    },
  },
  Mutation: {
    login: async (_parent: unknown, args: { credentials: Credentials }) => {
      const user = await userModel.findOne({
        email: args.credentials.username,
      });
      if (
        !user ||
        !bcrypt.compareSync(args.credentials.password, user.password)
      ) {
        const response: LoginMessageResponse = {
          message: 'Incorrect username/password',
        };
        return response;
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string
      );

      const userOutPut: UserOutPut = {
        user_name: user.user_name,
        email: user.email,
        id: user._id,
        role: user.role,
      };

      const loginResponse: LoginMessageResponse = {
        message: 'Login successful',
        token,
        user: userOutPut,
      };

      return loginResponse;
    },
    register: async (_parent: unknown, args: { user: User }) => {
      const user = args.user;
      user.password = await bcrypt.hash(user.password, salt);
      const newUser = await userModel.create(user);
      if (!newUser) {
        throw new GraphQLError('Username or email already exists', {
          extensions: { code: 'USER_EXISTS' },
        });
      }

      const response: UserMessageResponse = {
        message: 'user created',
        user: {
          user_name: newUser.user_name,
          email: newUser.email,
          id: newUser._id,
        },
      };
      return response;
    },
    deleteUser: async (
      _parent: unknown,
      _args: unknown,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }
      const result = await userModel.findByIdAndDelete(user.id);
      if (!result) {
        throw new GraphQLError('User not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      const response: UserMessageResponse = {
        message: 'User deleted',
        user: {
          user_name: result.user_name,
          email: result.email,
          id: result._id,
        },
      };

      return response;
    },
  },
};
