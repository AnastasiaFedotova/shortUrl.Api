import * as Sequelize from "sequelize";
import sequelize from "./dbShema";
import User from "../models/users";
import Comment from "./commentShema";
import Link from "./linkShema";
User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
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

User.hasMany(Comment, { foreignKey: 'id' })
Comment.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(Link, { foreignKey: 'id' })
Link.belongsTo(User, { foreignKey: 'user_id' })

export default User;
