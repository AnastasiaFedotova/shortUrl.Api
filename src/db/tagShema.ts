import * as Sequelize from "sequelize";
import sequelize from './dbShema';
import Tag from "../models/tags";
import LinksTag from "./linksTagShema";

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

Tag.hasMany(LinksTag, { foreignKey: 'tag_id' });
LinksTag.belongsTo(Tag, { foreignKey: 'tag_id' });

export default Tag;
