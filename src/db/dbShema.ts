import * as Sequelize from "sequelize";
import Links from "../models/links";
import Users from "../models/users";
import config from "../../configs/appconfig";

const sequelize = new Sequelize.Sequelize(config.db_name, config.user, config.password, {
  dialect: "postgres",
  define: {
    timestamps: false
  }
});

Links.init(
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

Users.init(
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

sequelize.sync().then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
})

export default sequelize;
