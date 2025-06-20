/**
 * Common types and interfaces used throughout the application
 */

/**
 * Basic response structure for API calls
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Error response structure
 */
export interface ErrorResponse {
  success: false;
  error: string;
  message?: string;
  code?: string;
}

/**
 * Success response structure
 */
export interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

/**
 * Configuration interface
 */
export interface AppConfig {
  environment: string;
  port: number;
  logLevel: string;
  debug: boolean;
}

/**
 * Log levels supported by the logger
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Environment types
 */
export type Environment = 'development' | 'production' | 'test';

/**
 * Generic callback function type
 */
export type Callback<T = void> = (error?: Error | null, result?: T) => void;

/**
 * Async function type
 */
export type AsyncFunction<T = void> = () => Promise<T>;

/**
 * Event handler function type
 */
export type EventHandler<T = unknown> = (event: T) => void | Promise<void>; 