import { User } from './User';

interface Review {
  id: string;
  text: string;
  value: number;
  user: User;
}

interface ReviewInput {
  value: number;
  text: string;
  item: string;
}

export type { Review, ReviewInput };
