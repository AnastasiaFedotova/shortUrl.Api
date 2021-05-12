import { Model } from 'sequelize';

export default class Links extends Model {
  id: number;
  original_url: string;
  short_url: string | null;
  user_id: string | null;
  view_count: number | null;
}
