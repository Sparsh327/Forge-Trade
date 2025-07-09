import { z } from "zod";

const EnvSchema = z
  .object({
    PORT: z.coerce.number().default(9999),
    NODE_ENV: z.string().default("development"),
    LOG_LEVEL: z.enum([
      "fatal",
      "error",
      "warn",
      "info",
      "debug",
      "trace",
      "silent",
    ]),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string(),
    JWT_EXPIRATION: z.string().default("30d"),
    EMAIL_USER: z.string(),
    EMAIL_PASSWORD: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
  })
  .superRefine((input, ctx) => {
    if (input.NODE_ENV === "production") {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: "string",
        received: "undefined",
        path: ["DATABASE_AUTH_TOKEN"],
        message: "Must be set when NODE_ENV is 'production'",
      });
    }
  });

export type env = z.infer<typeof EnvSchema>;

const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

export default env!;
