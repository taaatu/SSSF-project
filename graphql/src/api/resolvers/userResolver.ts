import { GraphQLError } from 'graphql';
import { User, UserIdWithToken } from '../../interfaces/User';
import LoginMessageResponse from '../../interfaces/LoginMessageResponse';
import { Item } from '../../interfaces/Item';
import { RentDeal } from '../../interfaces/RentDeal';
import { Review } from '../../interfaces/Review';
import getUser from '../../utils/getUser';

export default {
  Item: {
    owner: async (parent: Item) => {
      const response = await fetch(
        `${process.env.AUTH_URL}/users/${parent.owner}`
      );
      if (!response.ok) {
        throw new GraphQLError(response.statusText, {
          extensions: { code: 'NOT_FOUND' },
        });
      }
      const user = (await response.json()) as User;
      return user;
    },
  },
  RentDeal: {
    item_user: async (parent: RentDeal) => {
      const response = await fetch(
        `${process.env.AUTH_URL}/users/${parent.item_user}`
      );
      if (!response.ok) {
        throw new GraphQLError(response.statusText, {
          extensions: { code: 'NOT_FOUND' },
        });
      }
      const user = (await response.json()) as User;
      return user;
    },
  },
  Review: {
    user: async (parent: Review) => {
      return await getUser(parent.user);
    },
  },
  Query: {
    checkToken: async (
      _parent: unknown,
      _args: unknown,
      user: UserIdWithToken
    ) => {
      const response = await fetch(`${process.env.AUTH_URL}/users/token`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new GraphQLError(response.statusText, {
          extensions: { code: 'NOT_FOUND' },
        });
      }
      const userFromAuth = await response.json();
      console.log('////checkToken', userFromAuth);
      return userFromAuth;
    },
  },
  Mutation: {
    login: async (
      _parent: unknown,
      args: { credentials: { username: string; password: string } }
    ) => {
      const response = await fetch(`${process.env.AUTH_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args.credentials),
      });
      if (!response.ok) {
        throw new GraphQLError(response.statusText, {
          extensions: { code: 'NOT_FOUND' },
        });
      }
      const user = (await response.json()) as LoginMessageResponse;
      return user;
    },
    register: async (_parent: unknown, args: { user: User }) => {
      const response = await fetch(`${process.env.AUTH_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args.user),
      });
      if (!response.ok) {
        throw new GraphQLError(response.statusText, {
          extensions: { code: 'VALIDATION_ERROR' },
        });
      }
      const user = (await response.json()) as LoginMessageResponse;
      return user;
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
      const response = await fetch(`${process.env.AUTH_URL}/users`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new GraphQLError(response.statusText, {
          extensions: { code: 'NOT_FOUND' },
        });
      }
      const userFromDelete = (await response.json()) as LoginMessageResponse;
      return userFromDelete;
    },
  },
};
