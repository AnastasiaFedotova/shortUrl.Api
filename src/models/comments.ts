import { Model } from 'sequelize';

export default class Comment extends Model {
  id: number;
  message: string;
  link_id: number;
  user_id: number;
}
