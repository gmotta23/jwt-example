import { database } from "../db/postgres";

export const testCommands = {
  resetDB: () => {
    database.resetUsers();
  },
  resetRedis: () => {},
};
