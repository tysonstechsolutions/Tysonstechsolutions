/**
 * Centralized logging utility
 *
 * Provides structured logging with levels and context.
 * In production, only warnings and errors are logged.
 * In development, all log levels are shown.
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  [key: string]: unknown;
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
}

// Log level priorities (higher = more severe)
const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Minimum log level based on environment
const MIN_LOG_LEVEL: LogLevel = process.env.NODE_ENV === "production" ? "warn" : "debug";

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[MIN_LOG_LEVEL];
}

function formatLogEntry(entry: LogEntry): string {
  const { level, message, timestamp, context } = entry;
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  if (context && Object.keys(context).length > 0) {
    return `${prefix} ${message} ${JSON.stringify(context)}`;
  }

  return `${prefix} ${message}`;
}

function createLogEntry(level: LogLevel, message: string, context?: LogContext): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
  };
}

/**
 * Logger singleton with methods for each log level
 */
export const logger = {
  /**
   * Debug level - only shown in development
   * Use for detailed debugging information
   */
  debug(message: string, context?: LogContext): void {
    if (!shouldLog("debug")) return;
    const entry = createLogEntry("debug", message, context);
    console.debug(formatLogEntry(entry));
  },

  /**
   * Info level - general information
   * Use for successful operations, startup messages, etc.
   */
  info(message: string, context?: LogContext): void {
    if (!shouldLog("info")) return;
    const entry = createLogEntry("info", message, context);
    console.info(formatLogEntry(entry));
  },

  /**
   * Warn level - potential issues
   * Use for deprecated usage, suboptimal conditions, recoverable errors
   */
  warn(message: string, context?: LogContext): void {
    if (!shouldLog("warn")) return;
    const entry = createLogEntry("warn", message, context);
    console.warn(formatLogEntry(entry));
  },

  /**
   * Error level - errors that need attention
   * Use for exceptions, failed operations, critical issues
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    if (!shouldLog("error")) return;

    const errorContext: LogContext = { ...context };

    if (error instanceof Error) {
      errorContext.errorName = error.name;
      errorContext.errorMessage = error.message;
      if (process.env.NODE_ENV !== "production") {
        errorContext.stack = error.stack;
      }
    } else if (error !== undefined) {
      errorContext.error = String(error);
    }

    const entry = createLogEntry("error", message, errorContext);
    console.error(formatLogEntry(entry));
  },

  /**
   * Create a child logger with preset context
   * Useful for adding request IDs, user IDs, etc.
   */
  child(baseContext: LogContext) {
    return {
      debug: (message: string, context?: LogContext) =>
        logger.debug(message, { ...baseContext, ...context }),
      info: (message: string, context?: LogContext) =>
        logger.info(message, { ...baseContext, ...context }),
      warn: (message: string, context?: LogContext) =>
        logger.warn(message, { ...baseContext, ...context }),
      error: (message: string, error?: Error | unknown, context?: LogContext) =>
        logger.error(message, error, { ...baseContext, ...context }),
    };
  },
};

export default logger;
