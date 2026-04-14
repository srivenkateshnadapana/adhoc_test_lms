import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/sequelize';

export class Subscription extends Model {
  public id!: number;
  public userId!: number;
  public courseId!: number;
  public plan!: '1month' | '3months' | '6months';
  public startDate!: Date;
  public endDate!: Date;
  public status!: 'active' | 'expired';
  public amount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Subscription.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  plan: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['1month', '3months', '6months']],
    },
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
    validate: {
      isIn: [['active', 'expired']],
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: true,
  tableName: 'subscriptions',
});

export default Subscription;
