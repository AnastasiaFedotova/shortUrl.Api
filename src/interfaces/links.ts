export interface LinksInterface {
  original_url: string;
  short_url: string | null;
  user_id: number | null;
  view_count: number | null;
}

export interface CustomLink {
  shortUrl: string,
  customUrl: string
}
