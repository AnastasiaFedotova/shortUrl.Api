import * as Sequelize from 'sequelize';
import config from '../../configs/appconfig';

const sequelize = new Sequelize.Sequelize(config.db_name, config.user, config.password, {
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});

sequelize.sync().then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
})

export default sequelize;
