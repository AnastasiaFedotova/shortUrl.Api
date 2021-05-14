import { v4 } from "uuid";
import User from "../models/users";
import Session from "../models/sessions";
import { SessionsInterface } from "./../interfaces/sessions";

async function logIn(login: string, password: string): Promise<string> {
  try {
    const user = await User.findOne({
      where: {
        login: login
      }, raw: true
    });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.password === password) {
      return user.id;
    }

    throw new Error("Invalid password");
  } catch (err) {
    console.log(err)
  }
}

async function create(userId: string): Promise<string> {
  try {
    const timeLife = new Date();
    timeLife.setDate(timeLife.getDate() + 1);
    const session: SessionsInterface = {
      id: v4(),
      date: timeLife,
      user_id: userId
    }
    const newSession = await Session.create(session);

    return newSession.id;
  } catch (err) {
    console.log(err)
  }
}

async function find(sessionId: string): Promise<Session> {
  try {
    const session = await Session.findOne({
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

async function remove(sessionId: string): Promise<null> {
  try {
    await Session.destroy({
      where: { id: sessionId }
    });

    return null;
  } catch (err) {
    console.log(err)
  }
}

export const authorizeService = {
  logIn,
  create,
  find,
  remove
}
