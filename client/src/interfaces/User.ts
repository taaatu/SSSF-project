import { Document } from 'mongoose';
interface User {
  user_name: string;
  email: string;
  password: string;
}

export type { User };
