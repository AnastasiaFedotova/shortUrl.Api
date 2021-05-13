import { Model } from 'sequelize';

export default class Session extends Model {
  id: string;
  login: string;
  password: string
}

export interface Sessions {
  id: string;
  date: string;
  user_id: string;
}
