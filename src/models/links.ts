import { Model } from 'sequelize';

export default class Link extends Model {
  id: number;
  original_url: string;
  short_url: string | null;
  user_id: string | null;
  view_count: number | null;
}

export interface Links {
  original_url: string;
  short_url: string | null;
  user_id: string | null;
  view_count: number | null;
}
