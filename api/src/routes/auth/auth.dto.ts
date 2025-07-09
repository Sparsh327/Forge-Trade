import { z } from "@hono/zod-openapi";

export const signupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  password: z.string().min(8).max(20),
});

export type SignupSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// export const verifyEmailSchema = z.object({
//   email: z.string().email(),
//   otp: z.string().length(6),
// });

// export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;

export const resendOtpSchema = z.object({
  email: z.string().email(),
});
export type ResendOtpSchema = z.infer<typeof resendOtpSchema>;

// export const updatePasswordSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8).max(20),
//   otp: z.string().length(6),
// });
// export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;

export const loginViaGoogleSchema = z.object({
  idToken: z.string(),
});
export type LoginViaGoogleSchema = z.infer<typeof loginViaGoogleSchema>;

export const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const authResponseSchema = z.object({
  accessToken: z.string(),
});
export type AuthResponseSchema = z.infer<typeof authResponseSchema>;
