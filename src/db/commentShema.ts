import * as Sequelize from "sequelize";
import sequelize from './dbShema';
import Comment from "../models/comments";

Comment.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false
    },
    link_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'comments',
  }
);

export default Comment;
