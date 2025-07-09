import { sign, verify } from "hono/jwt";
import { users, type User } from "../db/schema/schema";
import env from "../env";
import {
  JwtAlgorithmNotImplemented,
  JwtTokenExpired,
  JwtTokenInvalid,
  JwtTokenIssuedAt,
  JwtTokenNotBefore,
  JwtTokenSignatureMismatched,
} from "hono/utils/jwt/types";
import { db } from "../db/db";
import { eq } from "drizzle-orm";

import { OAuth2Client } from "google-auth-library";
// import { EmailHelper } from "./email.helper";

export class AuthHelper {
  static hashPassword(password: string): string {
    return Bun.password.hashSync(password, {
      algorithm: "bcrypt",
    });
  }

  static comparePassword(password: string, hash: string): boolean {
    return Bun.password.verifySync(password, hash);
  }

  static async generateJwtToken(user: User): Promise<string> {
    const res = await sign(
      {
        ...user,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
      },
      env.JWT_SECRET
    );

    return res;
  }

  static async verifyJwtToken(token: string): Promise<User> {
    try {
      const res = (await verify(token, env.JWT_SECRET)) as User;
      const userData = await db
        .select()
        .from(users)
        .where(eq(users.id, res.id))
        .limit(1);

      if (userData.length === 0) {
        throw new Error("User not found");
      }

      return userData[0]!;
    } catch (error) {
      switch (error) {
        case JwtAlgorithmNotImplemented:
          throw new Error("The requested JWT algorithm is not implemented.");

        case JwtTokenInvalid:
          throw new Error("The JWT token is invalid.");

        case JwtTokenNotBefore:
          throw new Error("The token is being used before its valid date.");

        case JwtTokenExpired:
          throw new Error("The token has expired.");

        case JwtTokenIssuedAt:
          throw new Error("The 'iat' claim in the token is incorrect.");

        case JwtTokenSignatureMismatched:
          throw new Error("The token signature does not match.");

        default:
          throw new Error("An unknown JWT error occurred.");
      }
    }
  }

  // static async sendOtp(email: string): Promise<OTPPayload> {
  //   const otp = Math.floor(100000 + Math.random() * 900000).toString();

  //   const subject = "Email Verification";
  //   const text = `Your OTP is ${otp}. Please verify your email.`;

  //   await EmailHelper.sendEmail(email, subject, text);
  //   console.log(`Verification email sent to ${email}`);

  //   return { otp, expiresAt: new Date(Date.now() + 1000 * 60 * 10) };
  // }

  static async verifyGoogleToken(token: string) {
    try {
      const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (!payload) {
        throw new Error("Invalid token payload");
      }

      return payload;
    } catch (error) {
      console.error("Error verifying Google token:", error);
      throw new Error("Google token verification failed");
    }
  }
}

type OTPPayload = {
  otp: string;
  expiresAt: Date;
};
