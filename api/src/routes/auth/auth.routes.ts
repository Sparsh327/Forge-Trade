// src/routes.route.ts
import { createRoute, z } from "@hono/zod-openapi";
import {
  signupSchema,
  loginSchema,
  loginViaGoogleSchema,
  updateUserSchema,
} from "./auth.dto";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { userSchema } from "../users/user.dto";

export const signup = createRoute({
  method: "post",
  path: "/signup",
  tags: ["Auth"],
  request: {
    body: jsonContentRequired(signupSchema, "Signup Request"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Signup Request"
    ),
  },
});

// export const verifyEmail = createRoute({
//   method: "post",
//   path: "/verify-email",
//   tags: ["Auth"],
//   request: {
//     body: jsonContentRequired(verifyEmailSchema, "Verify Email Request"),
//   },
//   responses: {
//     [HttpStatusCodes.OK]: jsonContent(
//       userSchema.extend({ token: z.string() }),
//       "Verify Email Request"
//     ),
//     [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
//       z.object({ message: z.string() }),
//       "Verify Email Request"
//     ),
//   },
// });

// export const resendOtp = createRoute({
//   method: "post",
//   path: "/resend-otp",
//   tags: ["Auth"],
//   request: {
//     body: jsonContentRequired(resendOtpSchema, "Resend Otp Request"),
//   },
//   responses: {
//     [HttpStatusCodes.OK]: jsonContent(
//       z.object({ message: z.string() }),
//       "Resend Otp Request"
//     ),
//   },
// });

export const login = createRoute({
  method: "post",
  path: "/login",
  tags: ["Auth"],
  request: {
    body: jsonContentRequired(loginSchema, "Login Request"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      userSchema.extend({ token: z.string() }),
      "Login Request"
    ),
  },
});

export const loginViaGoogle = createRoute({
  method: "post",
  path: "/google-login",
  tags: ["Auth"],
  request: {
    body: jsonContentRequired(loginViaGoogleSchema, "Login Request"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      userSchema.extend({ token: z.string() }),
      "Login Request"
    ),
  },
});

// export const updatePassword = createRoute({
//   method: "post",
//   path: "/update-password",
//   tags: ["Auth"],
//   request: {
//     body: jsonContentRequired(updatePasswordSchema, "Update Password Request"),
//   },
//   responses: {
//     [HttpStatusCodes.OK]: jsonContent(
//       userSchema.extend({ token: z.string() }),
//       "Update Password Request"
//     ),
//   },
// });

export const updateUser = createRoute({
  method: "put",
  path: "/update-user",
  tags: ["Auth"],
  request: {
    body: jsonContentRequired(updateUserSchema, "Update User Request"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(userSchema, "Update User Request"),
  },
});

export type SignupRoute = typeof signup;
// export type VerifyEmailRoute = typeof verifyEmail;
// export type ResendOtpRoute = typeof resendOtp;
export type LoginRoute = typeof login;
export type LoginViaGoogleRoute = typeof loginViaGoogle;
// export type UpdatePasswordRoute = typeof updatePassword;
export type UpdateUserRoute = typeof updateUser;
