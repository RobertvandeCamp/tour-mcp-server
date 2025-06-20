/**
 * Simple logger utility for consistent logging throughout the application
 * Provides different log levels and formatted output
 */
export class Logger {
  private readonly context: string;

  constructor(context: string) {
    this.context = context;
  }

  /**
   * Log an info message
   * @param message - The message to log
   * @param data - Optional data to include
   */
  public info(message: string, data?: unknown): void {
    this.log('INFO', message, data);
  }

  /**
   * Log a warning message
   * @param message - The message to log
   * @param data - Optional data to include
   */
  public warn(message: string, data?: unknown): void {
    this.log('WARN', message, data);
  }

  /**
   * Log an error message
   * @param message - The message to log
   * @param error - Optional error object
   */
  public error(message: string, error?: unknown): void {
    this.log('ERROR', message, error);
  }

  /**
   * Log a debug message (only in development)
   * @param message - The message to log
   * @param data - Optional data to include
   */
  public debug(message: string, data?: unknown): void {
    if (process.env['NODE_ENV'] === 'development' || process.env['DEBUG'] === 'true') {
      this.log('DEBUG', message, data);
    }
  }

  /**
   * Internal logging method that formats and outputs the message
   * @param level - The log level
   * @param message - The message to log
   * @param data - Optional data to include
   */
  private log(level: string, message: string, data?: unknown): void {
    const timestamp = new Date().toISOString();
    
    // Format the output based on log level
    const formattedMessage = `[${timestamp}] ${level} [${this.context}] ${message}`;
    
    switch (level) {
      case 'ERROR':
        console.error(formattedMessage);
        if (data) {
          console.error('Error details:', data);
        }
        break;
      case 'WARN':
        console.warn(formattedMessage);
        if (data) {
          console.warn('Warning details:', data);
        }
        break;
      case 'DEBUG':
        console.debug(formattedMessage);
        if (data) {
          console.debug('Debug details:', data);
        }
        break;
      default:
        console.log(formattedMessage);
        if (data) {
          console.log('Additional data:', data);
        }
    }
  }
} 