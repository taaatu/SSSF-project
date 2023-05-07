import { GraphQLError } from 'graphql';
import { UserIdWithToken } from '../interfaces/User';

export const checkAuthorization = (user: UserIdWithToken) => {
  if (!user.token) {
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED' },
    });
  }
};
