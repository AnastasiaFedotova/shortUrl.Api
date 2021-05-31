import * as Sequelize from "sequelize";
import sequelize from './dbShema';
import Link from "../models/links";
import Comment from "./commentShema";

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
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'links',
  }
);

Link.hasMany(Comment, { foreignKey: 'id' })
Comment.belongsTo(Link, { foreignKey: 'link_id' })

export default Link;
