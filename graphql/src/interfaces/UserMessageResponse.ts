import { User, UserOutPut } from './User';

interface UserMessageResponse {
  message: string;
  user: UserOutPut;
}

interface CheckTokenResponse {
  message: string;
  user: Pick<User, 'id' | 'role'>;
}

export { UserMessageResponse, CheckTokenResponse };
