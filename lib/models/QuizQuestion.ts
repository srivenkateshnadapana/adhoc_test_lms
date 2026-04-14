import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/sequelize';

export class QuizQuestion extends Model {
  public id!: number;
  public quizId!: number;
  public questionText!: string;
  public options!: any;
  public correctAnswer!: number;
  public explanation!: string;
  public points!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

QuizQuestion.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quizId: { type: DataTypes.INTEGER, allowNull: false },
  questionText: { type: DataTypes.TEXT, allowNull: false },
  options: { type: DataTypes.JSON, allowNull: false },
  correctAnswer: { type: DataTypes.INTEGER, allowNull: false },
  explanation: { type: DataTypes.TEXT },
  points: { type: DataTypes.INTEGER, defaultValue: 1 },
}, {
  sequelize,
  timestamps: true,
  tableName: 'quiz_questions',
});

export default QuizQuestion;
