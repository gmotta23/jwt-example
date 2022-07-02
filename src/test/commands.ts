import { database } from "../db/postgres";
import { Redis } from "../db/redis";

export const testCommands = {
  resetDB: () => {
    database.resetUsers();
  },
  resetRedis: async () => {
    return await (await Redis.client()).flushAll();
  },
};
