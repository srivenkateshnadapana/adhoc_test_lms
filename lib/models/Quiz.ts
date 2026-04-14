import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/sequelize';

export class Quiz extends Model {
  public id!: number;
  public courseId!: number;
  public title!: string;
  public description!: string;
  public type!: string;
  public passingScore!: number;
  public timeLimit!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Quiz.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  courseId: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  type: { type: DataTypes.STRING, defaultValue: 'final' },
  passingScore: { type: DataTypes.INTEGER, defaultValue: 70 },
  timeLimit: { type: DataTypes.INTEGER, defaultValue: 30 },
}, {
  sequelize,
  timestamps: true,
  tableName: 'quizzes',
});

export default Quiz;
