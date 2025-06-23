import { IRateLimiter } from "../interfaces/IRateLimiter";

export class FixedWindowLimiter implements IRateLimiter {
  private windowStart: number;
  private count: number;

  constructor(private windowSize: number, private maxRequests: number) {
    this.windowStart = Date.now();
    this.count = 0;
  }

  allowRequest(): boolean {
    const now = Date.now();

    if (now - this.windowStart >= this.windowSize) {
      this.windowStart = now;
      this.count = 1;
      return true;
    }

    if (this.count < this.maxRequests) {
      this.count++;
      return true;
    }

    return false;
  }
}
