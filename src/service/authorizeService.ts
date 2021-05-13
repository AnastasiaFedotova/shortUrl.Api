import { v4 } from "uuid";
import User from "../models/users";
import Session, { Sessions } from "../models/sessions";
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

async function create(id: string): Promise<string> {
  try {
    const session: Sessions = {
      id: v4(),
      date: new Date(),
      user_id: id
    }
    const newSession = await Session.create(session);

    return newSession.id;
  } catch (err) {
    console.log(err)
  }
}

const service = {
  logIn,
  create
}

export default service;
