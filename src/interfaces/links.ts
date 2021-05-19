export interface LinksInterface {
  original_url: string;
  short_url: string | null;
  user_id: string | null;
  view_count: number | null;
}

export interface CustomLink {
  url: string,
  customUrl: string
}
