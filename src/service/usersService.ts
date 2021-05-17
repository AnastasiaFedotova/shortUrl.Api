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

async function add(user: UsersInterface): Promise<User> {
  try {
    const newUser: UsersInterface = {
      login: user.login,
      password: user.password
    }
    const res = await User.create(newUser);
    return res;
  } catch (err) {
    console.log(err)
  }
}

export const userService = {
  add,
  read
};
