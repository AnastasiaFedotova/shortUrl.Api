import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import bcrypt from "bcrypt";
import { UsersInterface } from '../../interfaces/users';
import { User } from './../../models/users';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async read(): Promise<User[]> {
    try {
      return this.userModel.findAll();
    } catch (err) {
      console.log(err)
    }
  }

  async readUserById(userId: number): Promise<UsersInterface> {
    try {
      const user = await  this.userModel.findOne({
        where: {
          id: userId
        }, raw: true
      });

      if (user) {
        return {
          id: user.id,
          login: user.login,
          password: null
        }
      }

      throw new Error("Not found");
    } catch (err) {
      console.log(err)
    }
  }

  async add(user: UsersInterface): Promise<UsersInterface> {
    try {
      const saltRounds = 10;
      const passwordToSave = user.password;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(passwordToSave, salt);
      const userToSave: UsersInterface = {
        login: user.login,
        password: hash
      }
      await  this.userModel.create(userToSave);

      return userToSave;
    } catch (err) {
      console.log(err)
    }
  }
}
