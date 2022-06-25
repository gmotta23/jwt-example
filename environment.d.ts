declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_HOST: string;
      SERVER_PORT: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {}