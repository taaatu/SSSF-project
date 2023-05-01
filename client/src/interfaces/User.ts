interface User {
  id: string;
  user_name: string;
  email: string;
  password: string;
  role?: string;
}

type RegisterInput = Omit<User, 'id'>;

type UserOutPut = Omit<User, 'password'>;

export type { User, UserOutPut, RegisterInput };
