import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Session extends Model {
  @Column({allowNull: false})
  date: Date;

  @Column({allowNull: false})
  user_id: number;

  @Column({ allowNull: false, primaryKey: true })
  id: string;
}
