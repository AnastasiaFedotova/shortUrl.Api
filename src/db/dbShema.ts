import * as Sequelize from "sequelize";
import Link from "../models/links";
import User from "../models/users";
import config from "../../configs/appconfig";
import Session from "./../models/sessions";

const sequelize = new Sequelize.Sequelize(config.db_name, config.user, config.password, {
  dialect: "postgres",
  define: {
    timestamps: false
  }
});

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

sequelize.sync().then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
})

export default sequelize;
