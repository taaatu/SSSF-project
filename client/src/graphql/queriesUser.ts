const login = `
mutation Login($credentials: Credentials!) {
    login(credentials: $credentials) {
      message
      token
      user {
        email
        id
        user_name
      }
    }
  }
  `;

const checkTokenQuery = `
query CheckToken {
    checkToken {
      message
      user {
        user_name
      }
    }
  }
`;

const register = `
mutation Mutation($user: UserInput!) {
    register(user: $user) {
      message
      user {
        id
        user_name
        email
      }
    }
  }
  `;

export { login, checkTokenQuery, register };
