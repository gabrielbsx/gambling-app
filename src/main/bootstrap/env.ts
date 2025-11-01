import z from "zod";

const envSchema = z.object({
  PORT: z
    .string()
    .transform((val) => Number(val))
    .default(3000),
  IDENTITY_DATABASE_URL: z.url(),
  COMMERCE_DATABASE_URL: z.url(),
});

export const env = envSchema.parse(process.env);
