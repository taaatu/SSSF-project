import { Document } from 'mongoose';
interface User extends Document {
  user_name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
}
// interface User {
//   id: string;
//   user_name: string;
//   email: string;
//   password?: string;
//   token?: string;
// }
interface UserOutPut {
  id: string;
  user_name: string;
  email: string;
  role?: 'user' | 'admin';
}

type UserNameId = Pick<UserOutPut, 'user_name' | 'id'>;

interface UserTest {
  id?: string;
  user_name?: string; // returned from graphql is snake_case
  userName?: string; // graphql variables are camelCase
  email?: string;
  password?: string;
  token?: string;
}

interface UserIdWithToken {
  id: string;
  token: string;
  role: 'user' | 'admin';
}

export { User, UserTest, UserIdWithToken, UserOutPut, UserNameId };
