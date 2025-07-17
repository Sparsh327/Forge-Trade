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
export type LoginRoute = typeof login;
export type LoginViaGoogleRoute = typeof loginViaGoogle;
export type UpdateUserRoute = typeof updateUser;
