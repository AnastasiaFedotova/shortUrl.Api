import { Model } from 'sequelize';

export default class User extends Model {
  id: string;
  login: string;
  password: string
}
