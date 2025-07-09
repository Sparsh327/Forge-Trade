import { z } from "@hono/zod-openapi";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  isEmailVerified: z.boolean().default(false),
   balance: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Invalid number string",
  }),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type UserSchema = z.infer<typeof userSchema>;
