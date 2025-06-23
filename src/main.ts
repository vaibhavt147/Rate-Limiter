import { RateLimitType } from "./enums/RateLimitType";
import { RateLimiterFactory } from "./factory/RateLimiterFactory";
import { RateLimiterConfig } from "./types/RateLimiterConfig";

const config_fixed_window = {
  type: RateLimitType.FIXED_WINDOW,
  windowSize: 10000,
  maxRequests: 3,
};

const config_bucket = {
  type: RateLimitType.TOKEN_BUCKET,
  bucketSize: 2,
  tokensPerSecond: 1,
};

function simulateRequest(userId: string, config: RateLimiterConfig) {
  const limiter = RateLimiterFactory.getOrCreateLimiter(userId, config);
  const allowed = limiter.allowRequest();
  console.log(
    `[${new Date().toISOString()}] ${userId} → ${
      allowed ? "✅ Allowed" : "❌ Blocked"
    }`
  );
}

// setInterval(() => simulateRequest("userA", config_fixed_window), 2000); // every 2s
// setInterval(() => simulateRequest("userB", config_fixed_window), 3000); // every 4s

setInterval(() => simulateRequest("userA", config_bucket), 250); // every 1/2s
// setInterval(() => simulateRequest("userB", config_bucket), 1000); // every 1s
