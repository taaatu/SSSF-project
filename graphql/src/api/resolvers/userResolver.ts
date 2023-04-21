import { GraphQLError } from 'graphql';
import { User } from '../../interfaces/User';
import LoginMessageResponse from '../../interfaces/LoginMessageResponse';

export default {
  Query: {},
  Mutation: {
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
