import { z } from "zod";

export const env = getEnv();

function getEnv() {
  const EnvSchema = z.object({
    GOOGLE_CLIENT_ID: z.string().min(1),
    JWT_SECRET: z.string().min(1),
  });

  const result = EnvSchema.safeParse(process.env);

  if (!result.success) {
    console.error(JSON.stringify(result.error.issues, null, 2));
    process.exit(1);
  }

  return result.data;
}
