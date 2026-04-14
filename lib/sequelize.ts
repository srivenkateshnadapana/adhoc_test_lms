import { Sequelize } from 'sequelize';
import pg from 'pg';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

// Global variable to maintain sequelize connection across HMR in development
const globalForSequelize = global as unknown as { sequelize: Sequelize };

export const sequelize = globalForSequelize.sequelize || new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectModule: pg, // Required for Next.js/Vercel to bundle pg correctly
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

if (process.env.NODE_ENV !== 'production') globalForSequelize.sequelize = sequelize;

export default sequelize;
