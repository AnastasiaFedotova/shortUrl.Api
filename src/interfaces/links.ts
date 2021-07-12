export interface LinksInterface {
  id?: number,
  original_url: string;
  short_url: string | null;
  user_id: number | null;
  view_count: number | null;
  tags?: string[],
  author?: string;
}

export interface CustomLink {
  shortUrl: string,
  customUrl: string
}
