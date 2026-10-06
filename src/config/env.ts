import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'testing']),
  DATABASE_URl: z.url({ error: 'DATABASE_URl must be a valid connection url.' }),
  API_SECRET: z.string().min(8, { error: 'API_SECRET must be at least 8 characters long.' }),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid or missing project env variables');

  const formattedError = z.treeifyError(parsedEnv.error);

  console.error(JSON.stringify(formattedError, null, 2));
  process.exit(1);
}
