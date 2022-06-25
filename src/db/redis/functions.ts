import { redisDB } from ".";

export const RedisFunctions = {
  set: (key: string, value: string) => {
    redisDB[key] = value;
  },
  get: (key: string) => {
    return redisDB[key];
  },
};
