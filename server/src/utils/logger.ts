import winston, { format, Logger } from 'winston';

// Create a new Winston logger instance with colorized output
const logger: Logger = winston.createLogger({
  level: 'error',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      let color = '';
      switch (level) {
        case 'info':
          color = '\x1b[32m'; // Green
          break;
        case 'warn':
          color = '\x1b[33m'; // Yellow
          break;
        case 'error':
          color = '\x1b[31m'; // Red
          break;
        default:
          color = '\x1b[0m'; // Reset color
          break;
      }
      return `${color}${timestamp} ${level.toUpperCase()}: ${message}\x1b[0m`; // Reset color after the message
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Example usage
logger.info('This is an informational message.');
logger.warn('This is a warning message.');
logger.error('This is an error message.');

export default logger;
