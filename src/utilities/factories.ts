/** Unique, synthetic values so tests never depend on each other's data. */
export function uniqueUsername(prefix = 'user'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
