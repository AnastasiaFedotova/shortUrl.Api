import { Model } from 'sequelize';

export default class LinksTag extends Model {
  id: number;
  tag_id: number;
  links_id: Array<number>;
}
