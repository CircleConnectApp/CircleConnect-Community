const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error('JWT_SECRET_KEY not set in environment');
  }
  logger.info('JWT Secret loaded successfully');
  return secret;
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  logger.info(`Authorization Header: ${authHeader}`);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const tokenString = authHeader.substring(7);
  logger.info(`Token String: ${tokenString}`);

  try {
    const secret = getJWTSecret();
    const decoded = jwt.verify(tokenString, secret);
      
    logger.info(`Decoded JWT claims: ${JSON.stringify(decoded)}`);

    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      logger.info(`Token expired at ${decoded.exp}`);
      return res.status(401).json({ error: 'Token expired' });
    }

    req.user = {
      id: decoded.user_id,
      role: decoded.role
    };

    next();
  } catch (error) {
    logger.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const adminMiddleware = (req, res, next) => {
  logger.info(`User role in AdminMiddleware: ${req.user?.role}`);
  
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin only' });
  }
  
  next();
};

module.exports = {
  authMiddleware,
  adminMiddleware
}; 