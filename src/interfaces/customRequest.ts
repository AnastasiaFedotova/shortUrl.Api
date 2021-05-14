import { Request } from 'express';

export interface customRequest extends Request {
  auts: {
    userId: string
  }
}
