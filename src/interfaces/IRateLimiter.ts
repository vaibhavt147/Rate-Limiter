export interface IRateLimiter {
  allowRequest(): boolean;
}
