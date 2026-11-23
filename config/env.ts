import { existsSync } from 'node:fs';

// Load a local .env file if present (Node built-in; no dotenv dependency).
if (existsSync('.env')) {
  process.loadEnvFile('.env');
}

export const timeouts = {
  test: 30_000,
  expect: 5_000,
  action: 10_000,
} as const;

/** Read a required variable, failing with a clear message if it is missing. */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name}. Copy .env.example to .env and fill it in.`);
  }
  return value;
}

export const config = {
  baseUrl: process.env.BASE_URL ?? 'http://localhost:8770',
  // Credentials are read lazily so tests that do not log in need none.
  get username(): string {
    return requireEnv('TEST_USERNAME');
  },
  get password(): string {
    return requireEnv('TEST_PASSWORD');
  },
};
