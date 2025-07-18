import { z } from "@hono/zod-openapi";

export const signupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export type SignupSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const resendOtpSchema = z.object({
  email: z.string().email(),
});
export type ResendOtpSchema = z.infer<typeof resendOtpSchema>;

export const loginViaGoogleSchema = z.object({
  idToken: z.string(),
});
export type LoginViaGoogleSchema = z.infer<typeof loginViaGoogleSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(3),
});
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const authResponseSchema = z.object({
  accessToken: z.string(),
});
export type AuthResponseSchema = z.infer<typeof authResponseSchema>;
