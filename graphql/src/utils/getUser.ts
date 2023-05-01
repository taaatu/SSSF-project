import { GraphQLError } from 'graphql';
import { User } from '../interfaces/User';
import { Types } from 'mongoose';

export default async (user: Types.ObjectId): Promise<User | undefined> => {
  try {
    const response = await fetch(`${process.env.AUTH_URL}/users/${user}`);
    if (!response.ok) {
      throw new GraphQLError(response.statusText, {
        extensions: { code: 'NOT_FOUND' },
      });
    }
    const json = (await response.json()) as User;
    return json;
  } catch (error) {
    console.error('getUser', error);
  }
};
