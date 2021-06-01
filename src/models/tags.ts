import { Model } from 'sequelize';

export default class Tag extends Model {
  id: number;
  name: string;
}
