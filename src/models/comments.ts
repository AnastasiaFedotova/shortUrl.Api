import { Model } from 'sequelize';

export default class Comment extends Model {
  id: string;
  message: string;
  link_id: string;
  user_id: string;
}
