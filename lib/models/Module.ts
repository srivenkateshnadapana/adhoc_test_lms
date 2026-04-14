import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/sequelize';

export class Module extends Model {
  public id!: number;
  public courseId!: number;
  public title!: string;
  public order!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Module.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: true,
  tableName: 'modules',
});

export default Module;
