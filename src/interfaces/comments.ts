export interface CommentsInterface {
  id?: number;
  message: string;
  link_id: number;
  user_id: number;
  user?: {
    login: string,
    id: number
  };
}
