import { Column, Model, Table } from 'sequelize-typescript';
import { Link } from './links';
import { LinksTag } from './linksTag';

@Table
export class Tag extends Model {
  @Column({allowNull: false})
  name: string;

  @Column({ defaultValue: true, primaryKey: true, autoIncrement: true })
  id: number;
}

Tag.belongsToMany(Link, { through: LinksTag, foreignKey: 'tag_id' });
Link.belongsToMany(Tag, { through: LinksTag, foreignKey: 'link_id' });
