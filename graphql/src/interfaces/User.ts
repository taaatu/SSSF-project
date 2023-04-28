interface User {
  id: string;
  user_name: string;
  email: string;
  password?: string;
  token?: string;
}

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
  role: string;
}

export { User, UserTest, UserIdWithToken };
