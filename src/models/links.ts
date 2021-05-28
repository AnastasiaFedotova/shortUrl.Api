import { Model } from 'sequelize';

export default class Link extends Model {
  id: string | null;
  original_url: string;
  short_url: string | null;
  user_id: string | null;
  view_count: number | null;
  tags: string[];
}
