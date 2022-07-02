declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_HOST: string;
      SERVER_PORT: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      NODE_ENV: "development" | "test" | "production";
      ACCESS_TOKEN_EXPIRATION: string;
      REFRESH_TOKEN_EXPIRATION: string;
      REFRESH_TOKEN_TTL: string;
    }
  }
  namespace Express {
    export interface Request {
      user: any;
    }
  }
}

export {};
