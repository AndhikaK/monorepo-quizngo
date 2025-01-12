import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(4000),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
});
export type Env = z.infer<typeof envSchema>;
