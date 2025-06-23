import { IRateLimiter } from "../interfaces/IRateLimiter";

export class TokenBucketLimiter implements IRateLimiter {
  private startTime: number;
  private tokens: number;

  constructor(private tokensPerSecond: number, private bucketSize: number) {
    this.tokens = 0;
    this.startTime = Date.now();
  }

  allowRequest(): boolean {
    const now = Date.now();
    const time = Math.floor((now - this.startTime) / 1000);
    if (time > 0) {
      const tokensToAdd = time * this.tokensPerSecond;
      this.tokens = Math.min(this.bucketSize, tokensToAdd + this.tokens);
      this.startTime += time * 1000;
    }
    if (this.tokens == 0) {
      return false;
    }
    this.tokens -= 1;
    return true;
  }
}
