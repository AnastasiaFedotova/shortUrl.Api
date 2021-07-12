import * as Sequelize from "sequelize";
import sequelize from './dbShema';
import Tag from "../models/tags";
import LinksTag from "./linksTagShema";
import Link from "./linkShema";

Tag.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'tags',
  }
);

Tag.belongsToMany(Link, { through: LinksTag, foreignKey: 'tag_id' });
Link.belongsToMany(Tag, { through: LinksTag, foreignKey: 'link_id' });

export default Tag;
