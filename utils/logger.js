const logger = {
  debug: (message) => console.debug(`[DEBUG] ${message}`),
  info: (message) => console.info(`[INFO] ${message}`),
  warn: (message) => console.warn(`[WARN] ${message}`),
  error: (message, error) => {
    console.error(`[ERROR] ${message}`, error || '');
  }
};

module.exports = logger; 