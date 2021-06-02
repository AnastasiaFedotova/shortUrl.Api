import * as Sequelize from "sequelize";
import sequelize from './dbShema';
import LinksTag from "../models/linksTag";

LinksTag.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tag_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    link_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  },
  {
    sequelize,
    tableName: 'linkstags',
  }
);

export default LinksTag;
