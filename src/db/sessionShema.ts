import Session from "./../models/sessions";
import * as Sequelize from "sequelize";
import sequelize from './dbShema';

Session.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    date: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'sessions',
  }
)

export default Session;
