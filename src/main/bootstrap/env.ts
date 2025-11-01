import z from "zod";

const envSchema = z.object({
  PORT: z
    .string()
    .transform((val) => Number(val))
    .default(3000),
  IDENTITY_DATABASE_URL: z.url(),
  COMMERCE_DATABASE_URL: z.url(),
  JWT_SECRET_KEY: z.string().min(1, "JWT_SECRET_KEY is required"),
  JWT_EXPIRES_IN: z
    .string()
    .transform((val) => Number(val))
    .default(3600),
});

export const env = envSchema.parse(process.env);
