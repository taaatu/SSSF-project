import { GraphQLError } from 'graphql';
import { User, UserIdWithToken } from '../../interfaces/User';
import LoginMessageResponse from '../../interfaces/LoginMessageResponse';

export default {
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
  },
};
