import * as Sequelize from "sequelize";
import sequelize from './dbShema';
import Link from "../models/links";

Link.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    original_url: {
      type: Sequelize.STRING,
      allowNull: false
    },
    short_url: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: true
    },
    view_count: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
  },
  {
    sequelize,
    tableName: 'links',
  }
);

export default Link;
