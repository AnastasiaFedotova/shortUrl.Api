import { Model } from 'sequelize';

export default class Session extends Model {
  id: string;
  date: Date;
  user_id: number;
}
