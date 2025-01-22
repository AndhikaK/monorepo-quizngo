import { z } from 'zod';

const envSchema = z.object({
  EXPO_PUBLIC_APP_VERSION: z.string().optional().default('0.0.1'),

  EXPO_PUBLIC_SERVER_URL: z.string(),
});

export const envConfig = envSchema.parse(process.env);
