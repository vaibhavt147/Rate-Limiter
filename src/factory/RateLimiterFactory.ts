import { FixedWindowLimiter } from "../classes/FixedWindowLimiter";
import { TokenBucketLimiter } from "../classes/TokenBucketLimiter";
import { RateLimitType } from "../enums/RateLimitType";
import { IRateLimiter } from "../interfaces/IRateLimiter";
import { RateLimiterConfig } from "../types/RateLimiterConfig";

export class RateLimiterFactory {
  private static cache: Map<string, IRateLimiter> = new Map();

  static getOrCreateLimiter(userId: string, config: RateLimiterConfig) {
    if (this.cache.has(userId)) {
      return this.cache.get(userId)!;
    }
    let limiter: IRateLimiter;

    switch (config.type) {
      case RateLimitType.FIXED_WINDOW:
        limiter = new FixedWindowLimiter(
          config.windowSize ?? 60000,
          config.maxRequests ?? 5
        );
        break;
      case RateLimitType.TOKEN_BUCKET:
        limiter = new TokenBucketLimiter(
          config.tokensPerSecond ?? 2,
          config.bucketSize ?? 3
        );
        break;
      default:
        throw new Error("Unsupported rate limiter type");
    }
    this.cache.set(userId, limiter);
    return limiter;
  }
}
