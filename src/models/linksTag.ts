import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class LinksTag extends Model {
  @Column({allowNull: false})
  link_id: number;

  @Column({allowNull: false})
  tag_id: number;

  @Column({ allowNull: false, primaryKey: true, autoIncrement: true })
  id: number;
}
