import bcrypt from "bcrypt";
import User from "../models/users";
import { UsersInterface } from "./../interfaces/users";

async function read(): Promise<Array<User>> {
  try {
    const res = await User.findAll();
    return res;
  } catch (err) {
    console.log(err)
  }
}

async function readUserById(userId: string): Promise<User> {
  try {
    const user = await User.findOne({
      where: {
        id: userId
      }, raw: true
    });

    if (user) {
      return user;
    }

    throw new Error("Not found");
  } catch (err) {
    console.log(err)
  }
}


async function add(user: UsersInterface): Promise<UsersInterface> {
  try {
    const saltRounds = 10;
    const passwordToSave = user.password;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(passwordToSave, salt);
    const userToSave: UsersInterface = {
      login: user.login,
      password: hash
    }
    await User.create(userToSave);

    return userToSave;
  } catch (err) {
    console.log(err)
  }
}

export const userService = {
  add,
  read,
  readUserById
};
