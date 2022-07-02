import { Redis } from ".";

export const RedisFunctions = {
  set: async (key: string, value: string, expiration_time?: number) => {
    return await (
      await Redis.client()
    ).set(key, value, {
      EX: expiration_time ? expiration_time : 0,
    });
  },
  get: async (key: string) => {
    return await (await Redis.client()).get(key);
  },
};
