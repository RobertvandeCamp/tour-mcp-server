import { Config } from '../config/config';

describe('Config', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Save original environment variables
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    // Restore original environment variables
    process.env = originalEnv;
  });

  describe('constructor', () => {
    it('should set default values when no environment variables are provided', () => {
      // Clear environment variables
      delete process.env.NODE_ENV;
      delete process.env.PORT;
      delete process.env.LOG_LEVEL;
      delete process.env.DEBUG;

      const config = new Config();

      expect(config.environment).toBe('development');
      expect(config.port).toBe(3000);
      expect(config.logLevel).toBe('info');
      expect(config.debug).toBe(true);
    });

    it('should use environment variables when provided', () => {
      process.env.NODE_ENV = 'production';
      process.env.PORT = '8080';
      process.env.LOG_LEVEL = 'warn';
      process.env.DEBUG = 'false';

      const config = new Config();

      expect(config.environment).toBe('production');
      expect(config.port).toBe(8080);
      expect(config.logLevel).toBe('warn');
      expect(config.debug).toBe(false);
    });
  });

  describe('get', () => {
    it('should return environment variable value', () => {
      process.env.TEST_VAR = 'test_value';
      const config = new Config();

      expect(config.get('TEST_VAR')).toBe('test_value');
    });

    it('should return default value when environment variable is not set', () => {
      const config = new Config();

      expect(config.get('NON_EXISTENT_VAR', 'default_value')).toBe('default_value');
    });

    it('should return undefined when environment variable is not set and no default provided', () => {
      const config = new Config();

      expect(config.get('NON_EXISTENT_VAR')).toBeUndefined();
    });
  });

  describe('isDevelopment', () => {
    it('should return true for development environment', () => {
      process.env.NODE_ENV = 'development';
      const config = new Config();

      expect(config.isDevelopment()).toBe(true);
    });

    it('should return false for non-development environment', () => {
      process.env.NODE_ENV = 'production';
      const config = new Config();

      expect(config.isDevelopment()).toBe(false);
    });
  });

  describe('isProduction', () => {
    it('should return true for production environment', () => {
      process.env.NODE_ENV = 'production';
      const config = new Config();

      expect(config.isProduction()).toBe(true);
    });

    it('should return false for non-production environment', () => {
      process.env.NODE_ENV = 'development';
      const config = new Config();

      expect(config.isProduction()).toBe(false);
    });
  });

  describe('toObject', () => {
    it('should return configuration as plain object', () => {
      process.env.NODE_ENV = 'test';
      process.env.PORT = '5000';
      process.env.LOG_LEVEL = 'debug';
      process.env.DEBUG = 'true';

      const config = new Config();
      const configObject = config.toObject();

      expect(configObject).toEqual({
        environment: 'test',
        port: 5000,
        logLevel: 'debug',
        debug: true,
      });
    });
  });
}); 