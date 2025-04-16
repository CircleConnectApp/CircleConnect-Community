require('dotenv').config();
const express = require('express');
const logger = require('./utils/logger');
const { initDB } = require('./database/database');
const communityRoutes = require('./routes/communityRoutes');


const jwtSecret = process.env.JWT_SECRET_KEY;
if (!jwtSecret) {
  logger.error('JWT_SECRET_KEY not set in environment');
  process.exit(1);
}
logger.info('JWT_SECRET_KEY loaded successfully');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/communities', communityRoutes);

const startServer = async () => {
  try {
    await initDB();
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();