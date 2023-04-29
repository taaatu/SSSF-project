import { Document } from 'mongoose';
interface User {
  id: string;
  user_name: string;
  email: string;
  password: string;
}

type RegisterInput = Omit<User, 'id'>;

type UserOutPut = Omit<User, 'password'>;

export type { User, UserOutPut, RegisterInput };
