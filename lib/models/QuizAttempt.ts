import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/sequelize';

export class QuizAttempt extends Model {
  public id!: number;
  public userId!: number;
  public quizId!: number;
  public score!: number;
  public percentage!: number;
  public answers!: any;
  public passed!: boolean;
  public completedAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

QuizAttempt.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  quizId: { type: DataTypes.INTEGER, allowNull: false },
  score: { type: DataTypes.INTEGER, defaultValue: 0 },
  percentage: { type: DataTypes.INTEGER, defaultValue: 0 },
  answers: { type: DataTypes.JSON },
  passed: { type: DataTypes.BOOLEAN, defaultValue: false },
  completedAt: { type: DataTypes.DATE },
}, {
  sequelize,
  timestamps: true,
  tableName: 'quiz_attempts',
});

export default QuizAttempt;
