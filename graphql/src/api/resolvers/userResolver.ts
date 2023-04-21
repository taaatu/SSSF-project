import { GraphQLError } from 'graphql';
import { User } from '../../interfaces/User';
import LoginMessageResponse from '../../interfaces/LoginMessageResponse';

export default {
  Query: {},
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
