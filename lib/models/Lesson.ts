import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/sequelize';

export class Lesson extends Model {
  public id!: number;
  public moduleId!: number;
  public title!: string;
  public videoUrl!: string;
  public pdfUrl!: string;
  public order!: number;
  public duration!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Lesson.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  moduleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pdfUrl: {
    type: DataTypes.STRING,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
  },
}, {
  sequelize,
  timestamps: true,
  tableName: 'lessons',
});

export default Lesson;
