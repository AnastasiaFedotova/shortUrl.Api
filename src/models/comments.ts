import { Column, Model, Table } from 'sequelize-typescript';
import { User } from './users';
@Table
export class Comment extends Model {
  @Column({allowNull: false})
  user_id: number;

  @Column({allowNull: false})
  link_id: number;

  @Column
  User?: User;

  @Column({allowNull: false})
  message: string;

  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
}
