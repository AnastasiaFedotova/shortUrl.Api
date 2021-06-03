import { Model } from 'sequelize';
import User from './users';

export default class Comment extends Model {
  id: number;
  message: string;
  link_id: number;
  user_id: number;
  User?: User;
}
