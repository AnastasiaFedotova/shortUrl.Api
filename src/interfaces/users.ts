export interface UsersInterface {
  id?: number;
  login: string;
  password?: string
}

export interface UsersResInterface {
  id: number;
  message: string;
  link_id: number;
  user_id: number;
  user?: {
    login: string,
    id: number
  };
}
