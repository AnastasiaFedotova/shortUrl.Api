import { Model } from 'sequelize';
export default class Link extends Model {
  id: number | null;
  original_url: string;
  short_url: string | null;
  user_id: number | null;
  view_count: number | null;
  tags: string[];
  addTag;
  getTags;
}
