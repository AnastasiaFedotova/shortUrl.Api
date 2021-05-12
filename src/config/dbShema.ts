const Sequelize = require("sequelize");

const sequelize = new Sequelize("linksdb", "postgres", "1321081Aa", {
  dialect: "postgres",
  define: {
    timestamps: false
  }
});

const LinksModel = sequelize.define("links", {
  original_url: {
    type: Sequelize.STRING,
    primeryKey: true,
    allowNull: false
  },
  short_url: {
    type: Sequelize.STRING
  },
  user_id: {
    type: Sequelize.STRING
  },
  view_count: {
    type: Sequelize.INTEGER
  }
});

const UsersModel = sequelize.define("users", {
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
});

sequelize.sync().then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
})

export = { LinksModel, UsersModel };
