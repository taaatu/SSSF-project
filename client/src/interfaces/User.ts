interface User {
  id: string;
  user_name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

type RegisterInput = Omit<User, 'id' | 'role'>;

type UserOutPut = Omit<User, 'password'>;

export type { User, UserOutPut, RegisterInput };
