import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { SessionsInterface } from '../../interfaces/sessions';
import { Session } from '../../models/sessions';
import { User } from '../../models/users';

@Injectable()
export class AuthorizeService {
  constructor(
    @InjectModel(Session)
    private authModel: typeof Session,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async logIn(login: string, password: string): Promise<number> {
    try {
      const user = await this.userModel.findOne({
        where: {
          login: login
        }, raw: true
      });
      if (!user) {
        throw new Error("User not found");
      }

      const isSamePsws = await bcrypt.compare(password, user.password);
      if (isSamePsws) {
        return user.id;
      }

      throw new Error("Invalid password");
    } catch (err) {
      console.log(err)
    }
  }

  async create(userId: number): Promise<string> {
    try {
      const timeLife = new Date();
      timeLife.setDate(timeLife.getDate() + 1);
      const session: SessionsInterface = {
        id: v4(),
        date: timeLife,
        user_id: userId
      }
      const newSession = await this.authModel.create(session);

      return newSession.id;
    } catch (err) {
      console.log(err)
    }
  }

  async find(sessionId: string): Promise<Session> {
    try {
      const session = await this.authModel.findOne({
        where: {
          id: sessionId
        }, raw: true
      });

      if (session) {
        return session;
      }

      throw new Error("Not found");
    } catch (err) {
      console.log(err)
    }
  }

  async remove(sessionId: string): Promise<null> {
    try {
      await this.authModel.destroy({
        where: { id: sessionId }
      });

      return null;
    } catch (err) {
      console.log(err)
    }
  }

  async findAuthUserId(sessionId: string): Promise<number> {
    try {
      const session = await this.find(sessionId)

      if (session) {
        return session.user_id;
      }

      throw new Error("Not found");
    } catch (err) {
      console.log(err)
    }
  }
}
