import { IRateLimiter } from "../interfaces/IRateLimiter";

export class UserLimiterManager {
  private userLimiters: Map<string, IRateLimiter> = new Map();
}
