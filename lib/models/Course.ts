import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/sequelize';

export class Course extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public thumbnail!: string;
  public price_1month!: number;
  public price_3months!: number;
  public price_6months!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Course.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  thumbnail: {
    type: DataTypes.STRING,
  },
  price_1month: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 499,
  },
  price_3months: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 1299,
  },
  price_6months: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 2499,
  }
}, {
  sequelize,
  timestamps: true,
  tableName: 'courses',
});

export default Course;
