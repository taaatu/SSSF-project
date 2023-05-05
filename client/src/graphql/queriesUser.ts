const loginQuery = `
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
        id
        role
      }
    }
  }
`;

const registerQuery = `
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

const deleteCurrentUserQuery = `
  mutation DeleteUser {
    deleteUser {
      message
      user {
        id
        user_name
        email
      }
    }
  }
  `;

const getUserQuery = `
query ExampleQuery($username: String!) {
  userByUsername(username: $username) {
    id
    user_name
  }
}
`;

export {
  loginQuery,
  checkTokenQuery,
  registerQuery,
  deleteCurrentUserQuery,
  getUserQuery,
};
