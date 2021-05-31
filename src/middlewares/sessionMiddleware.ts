import express from 'express';
import { customRequest } from './../interfaces/customRequest'
import { authorizeService } from './../service/authorizeService';

const session = async function (req: customRequest, res, next: express.NextFunction): Promise<void> {
  try {
    const sessionId = req.cookies.session;
    const session = await authorizeService.find(sessionId)

    if (!session) {
      res.clearCookie('session');
      throw Error('Session not found');
    }

    const userId = session.user_id;
    const date = new Date();

    if (date > session.date) {
      await authorizeService.remove(sessionId);
      throw new Error('Session timed out');
    }

    req.auts = {
      userId: +userId
    };

    console.log('LOGGED');
  } catch (err) {
    console.log(err);
  }

  next();
}

export default session;
