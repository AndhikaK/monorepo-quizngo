import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(4000),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),

  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_NAME: z.string(),
  DB_PASSWORD: z.string(),
});
export type Env = z.infer<typeof envSchema>;
