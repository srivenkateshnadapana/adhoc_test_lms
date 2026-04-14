import sequelize from '@/lib/sequelize';
import User from './User';
import Course from './Course';
import Module from './Module';
import Lesson from './Lesson';
import Subscription from './Subscription';
import Progress from './Progress';
import Quiz from './Quiz';
import QuizQuestion from './QuizQuestion';
import QuizAttempt from './QuizAttempt';
import Certificate from './Certificate';

// --- Associations ---

// User associations
User.hasMany(Subscription, { foreignKey: 'userId', as: 'subscriptions' });
Subscription.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Progress, { foreignKey: 'userId', as: 'progress' });
Progress.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Certificate, { foreignKey: 'userId', as: 'certificates' });
Certificate.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(QuizAttempt, { foreignKey: 'userId', as: 'quizAttempts' });
QuizAttempt.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Course associations
Course.hasMany(Module, { foreignKey: 'courseId', as: 'modules' });
Module.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

Course.hasMany(Subscription, { foreignKey: 'courseId', as: 'subscriptions' });
Subscription.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

Course.hasMany(Certificate, { foreignKey: 'courseId', as: 'certificates' });
Certificate.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

Course.hasMany(Quiz, { foreignKey: 'courseId', as: 'quizzes' });
Quiz.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

// Module associations
Module.hasMany(Lesson, { foreignKey: 'moduleId', as: 'lessons' });
Lesson.belongsTo(Module, { foreignKey: 'moduleId', as: 'module' });

// Quiz associations
Quiz.hasMany(QuizQuestion, { foreignKey: 'quizId', as: 'questions' });
QuizQuestion.belongsTo(Quiz, { foreignKey: 'quizId', as: 'quiz' });

Quiz.hasMany(QuizAttempt, { foreignKey: 'quizId', as: 'attempts' });
QuizAttempt.belongsTo(Quiz, { foreignKey: 'quizId', as: 'quiz' });

export {
  sequelize,
  User,
  Course,
  Module,
  Lesson,
  Subscription,
  Progress,
  Quiz,
  QuizQuestion,
  QuizAttempt,
  Certificate
};
