import User, { Users } from "../models/users";

async function read(): Promise<Array<User>> {
  try {
    const res = await User.findAll();
    return res;
  } catch (err) {
    console.log(err)
  }
}

async function add(user: Users): Promise<User> {
  try {
    const res = await User.create(user);
    return res;
  } catch (err) {
    console.log(err)
  }
}

export const userService = {
  add,
  read
};
