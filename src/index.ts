#!/usr/bin/env node

import { Logger } from './utils/logger';
import { Config } from './config/config';
import './mcp/server'; // Import the MCP server to start it

/**
 * Main application entry point
 * This is where the application starts and initializes all necessary components
 */
async function main(): Promise<void> {
  const logger = new Logger('Main');

  try {
    logger.info('Starting application...');

    // Load configuration
    const config = new Config();
    logger.info(`Application configured for environment: ${config.environment}`);

    // The MCP server is imported and will start automatically
    logger.info('MCP server imported and starting...');

    // Keep the process running
    process.on('SIGINT', () => {
      logger.info('Received SIGINT, shutting down gracefully...');
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      logger.info('Received SIGTERM, shutting down gracefully...');
      process.exit(0);
    });

  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the application
if (require.main === module) {
  main().catch((error) => {
    console.error('Failed to start application:', error);
    process.exit(1);
  });
} 