import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Link extends Model {
  @Column({allowNull: true})
  view_count: number;

  @Column({allowNull: true})
  user_id: number;

  @Column
  short_url: string;

  @Column({allowNull: false})
  original_url: string;

  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
}
