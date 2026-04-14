import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/sequelize';

export class Certificate extends Model {
  public id!: number;
  public userId!: number;
  public courseId!: number;
  public certificateNumber!: string;
  public verificationCode!: string;
  public issueDate!: Date;
  public quizScore!: number;
  public pdfPath!: string;
  public isVerified!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Certificate.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  courseId: { type: DataTypes.INTEGER, allowNull: false },
  certificateNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
  verificationCode: { type: DataTypes.STRING, allowNull: false, unique: true },
  issueDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  quizScore: { type: DataTypes.INTEGER, allowNull: false },
  pdfPath: { type: DataTypes.STRING },
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  sequelize,
  timestamps: true,
  tableName: 'certificates',
});

export default Certificate;
