import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/sequelize';

export class Progress extends Model {
  public id!: number;
  public userId!: number;
  public lessonId!: number;
  public completed!: boolean;
  public completedAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Progress.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lessonId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  completedAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  timestamps: true,
  tableName: 'progress',
  indexes: [
    {
      unique: true,
      fields: ['userId', 'lessonId'],
    },
  ],
});

export default Progress;
