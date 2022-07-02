import { createClient } from "redis";

export interface RedisKeyValue {
  key: string;
  value: string;
}

export const Redis = {
  client: async () => {
    const client = createClient({ url: process.env.REDIS_URL });
    await client.connect();
    return client;
  },
};
