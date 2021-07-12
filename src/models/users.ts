import { Column, Model, Table } from 'sequelize-typescript';
import { Comment } from './comments';
import { Link } from './links';

@Table
export class User extends Model {
  @Column({allowNull: false})
  login: string;

  @Column({allowNull: false})
  password: string;

  @Column({ defaultValue: true, primaryKey: true, autoIncrement: true })
  id: number;
}

User.hasMany(Comment, { foreignKey: 'user_id' })
Comment.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(Link, { foreignKey: 'user_id' })
Link.belongsTo(User, { foreignKey: 'user_id' })
