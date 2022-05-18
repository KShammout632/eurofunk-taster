import { User } from './user';

export interface Group {
  id: string;
  name: string;
  userIds: string[];
  permissions: string[];
}
