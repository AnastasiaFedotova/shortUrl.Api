import { Model } from 'sequelize';

export default class Session extends Model {
  id: string;
  date: Date;
  user_id: string;
}

export interface Sessions {
  id: string;
  date: Date;
  user_id: string;
}
