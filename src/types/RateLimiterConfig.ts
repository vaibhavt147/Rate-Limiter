import { RateLimitType } from "../enums/RateLimitType";

export type RateLimiterConfig = {
  type: RateLimitType;
  windowSize?: number;
  maxRequests?: number;
  tokensPerSecond?: number;
  bucketSize?: number;
};
