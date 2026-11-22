import { appendFileSync, mkdirSync } from 'node:fs';

const LOG_FILE = 'reports/test.log';

export type LogLevel = 'info' | 'warn' | 'error';

export interface Logger {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}

/** Structured JSON-lines logger: one entry per line with timestamp, level, test name and message. */
export function createLogger(testName: string): Logger {
  mkdirSync('reports', { recursive: true });
  const write = (level: LogLevel, message: string): void => {
    const entry = { time: new Date().toISOString(), level, test: testName, message };
    appendFileSync(LOG_FILE, JSON.stringify(entry) + '\n');
  };
  return {
    info: (m) => write('info', m),
    warn: (m) => write('warn', m),
    error: (m) => write('error', m),
  };
}
