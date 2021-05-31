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
      type: Sequelize.STRING(500),
      allowNull: false
    },
    short_url: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.INTEGER,
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

Link.hasMany(Comment, { foreignKey: 'link_id' })
Comment.belongsTo(Link, { foreignKey: 'id' })

export default Link;
