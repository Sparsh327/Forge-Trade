import { z } from "@hono/zod-openapi";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  isEmailVerified: z.boolean().default(false),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type UserSchema = z.infer<typeof userSchema>;
