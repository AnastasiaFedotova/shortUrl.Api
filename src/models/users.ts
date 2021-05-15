import { Model } from 'sequelize';

export default class User extends Model {
  id: string | null;
  login: string;
  password: string
}
