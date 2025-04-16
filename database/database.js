const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');

const dbHost = process.env.DB_HOST || 'localhost';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'yehia';
const dbName = process.env.DB_NAME || 'circleConnect';
const dbPort = process.env.DB_PORT || '5432';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  logging: msg => logger.debug(msg)
});

const initDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Successfully connected to the database');
  } catch (error) {
    logger.error('Could not connect to the database:', error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  initDB
}; 