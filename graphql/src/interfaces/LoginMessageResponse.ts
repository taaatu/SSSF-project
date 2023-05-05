import { User, UserOutPut } from './User';

export default interface LoginMessageResponse {
  token?: string;
  message: string;
  user?: UserOutPut;
}
