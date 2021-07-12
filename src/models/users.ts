import { Model } from 'sequelize';

export default class User extends Model {
  id: number;
  login: string;
  password: string
}
