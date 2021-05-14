import * as Sequelize from "sequelize";
import sequelize from './dbShema';
import User from "../models/users";

User.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
