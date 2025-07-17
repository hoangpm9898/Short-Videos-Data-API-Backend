import 'dotenv/config';
import z from 'zod';
import { parseEnv, port } from 'znv';

const createConfigFromEnvironment = (environment: NodeJS.ProcessEnv) => {
  const config = parseEnv(environment, {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    LOG_LEVEL: z
      .enum(['fatal', 'error', 'warn', 'log', 'debug', 'verbose'])
      .array()
      .default(['fatal', 'error', 'warn', 'log', 'debug']),
    DATABASE_URL: z.string().url(),
    PORT: port().default(3000),
    GOOGLE_SHEET_ID: z.string(),
    GOOGLE_SHEET_NAME: z.string(),
    GOOGLE_APPLICATION_CREDENTIALS: z.string(),
    API_PEXELS_URL: z.string().url(),
    API_PEXELS_KEY: z.string(),
  });

  return {
    ...config,
    isDev: config.NODE_ENV === 'development',
    isProd: config.NODE_ENV === 'production',
  };
};

export type Config = ReturnType<typeof createConfigFromEnvironment>;

export const config: Config = createConfigFromEnvironment(process.env);
