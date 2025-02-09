import { z } from 'zod';

export const envSchema = z.object({
  PROJECT_ID: z.string(),

  PORT: z.coerce.number().optional().default(4000),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),

  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),

  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
});
export type Env = z.infer<typeof envSchema>;
