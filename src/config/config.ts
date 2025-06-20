/**
 * Configuration management for the application
 * Handles environment variables and application settings
 */
export class Config {
  public readonly environment: string;
  public readonly port: number;
  public readonly logLevel: string;
  public readonly debug: boolean;

  constructor() {
    // Load environment variables with defaults
    this.environment = process.env['NODE_ENV'] || 'development';
    this.port = parseInt(process.env['PORT'] || '3000', 10);
    this.logLevel = process.env['LOG_LEVEL'] || 'info';
    this.debug = process.env['DEBUG'] === 'true' || this.environment === 'development';
  }

  /**
   * Get a configuration value by key
   * @param key - The configuration key
   * @param defaultValue - Default value if key is not found
   * @returns The configuration value
   */
  public get(key: string, defaultValue?: string): string | undefined {
    return process.env[key] || defaultValue;
  }

  /**
   * Check if the application is running in development mode
   * @returns True if in development mode
   */
  public isDevelopment(): boolean {
    return this.environment === 'development';
  }

  /**
   * Check if the application is running in production mode
   * @returns True if in production mode
   */
  public isProduction(): boolean {
    return this.environment === 'production';
  }

  /**
   * Get all configuration as a plain object
   * @returns Configuration object
   */
  public toObject(): Record<string, unknown> {
    return {
      environment: this.environment,
      port: this.port,
      logLevel: this.logLevel,
      debug: this.debug,
    };
  }
} 