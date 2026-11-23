import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** Load a JSON file from the data/ folder with a type supplied by the caller. */
export function loadData<T>(fileName: string): T {
  const path = resolve(process.cwd(), 'data', fileName);
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

export interface LoginCase {
  name: string;
  username: string;
  password: string;
  expectedError: string;
}
