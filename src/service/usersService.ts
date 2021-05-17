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

async function add(user: UsersInterface): Promise<UsersInterface> {
  try {
    const saltRounds = 10;
    const passwordToSave = user.password;
    const newUser: UsersInterface = {
      login: user.login,
      password: user.password
    };

    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) console.log(err);
      bcrypt.hash(passwordToSave, salt, (err, hash) => {
        if (err) console.log(err);
        const userToSave: UsersInterface = {
          login: user.login,
          password: hash
        }

        User.create(userToSave);
      });
    });

    return newUser;
  } catch (err) {
    console.log(err)
  }
}

export const userService = {
  add,
  read
};
