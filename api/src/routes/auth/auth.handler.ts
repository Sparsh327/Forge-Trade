import { db } from "@/db/db";
import {
  SignupRoute,
  LoginRoute,
  LoginViaGoogleRoute,
  UpdateUserRoute,
} from "@/routes/auth/auth.routes";
import { AppRouteHandler } from "@/lib/types";
import { User, users, balance } from "@/db/schema/schema";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { randomUUIDv7 } from "bun";
import { AuthHelper } from "@/helper/auth.helper";
import { eq } from "drizzle-orm";

export const signup: AppRouteHandler<SignupRoute> = async (c) => {
  try {
    const id = randomUUIDv7();
    const data = await c.req.json();
    const user = await db
      .insert(users)
      .values({
        id: id,
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .returning();

    if (user.length === 0) {
      throw new Error("User not created");
    }
    await db.insert(balance).values({
      id: randomUUIDv7(),
      amount: "1000000",
      currency: "USD",
      userId: id,
    });

    return c.json({ message: "User created successfully" }, HttpStatusCodes.OK);
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};

export const login: AppRouteHandler<LoginRoute> = async (c) => {
  try {
    const data = await c.req.json();
    const res = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email))
      .limit(1);

    if (res.length === 0) {
      throw new Error("User not found");
    }

    const user = res[0]!;
    if (!AuthHelper.comparePassword(data.password, user.password!)) {
      throw new Error("Invalid email or password");
    }
    const token = await AuthHelper.generateJwtToken(user);
    return c.json(
      {
        token,
        ...user,
      },
      HttpStatusCodes.OK
    );
  } catch (error) {
    throw error;
  }
};

export const loginViaGoogle: AppRouteHandler<LoginViaGoogleRoute> = async (
  c
) => {
  try {
    const data = await c.req.json();
    const payload = await AuthHelper.verifyGoogleToken(data.idToken);
    const res = await db
      .select()
      .from(users)
      .where(eq(users.email, payload.email!))
      .limit(1);

    let user: User;

    if (res.length === 0) {
      const id = randomUUIDv7();
      const createdUser = await db
        .insert(users)
        .values({
          id,
          name: payload.name!,
          email: payload.email!,
        })
        .returning();

      if (createdUser.length === 0) {
        throw new Error("User not created");
      }
      await db.insert(balance).values({
        id: randomUUIDv7(),
        amount: "1000000",
        currency: "USD",
        userId: id,
      });
      user = createdUser[0]!;
    } else {
      user = res[0]!;
    }

    const token = await AuthHelper.generateJwtToken(user);
    return c.json(
      {
        token,
        ...user,
      },
      HttpStatusCodes.OK
    );
  } catch (error) {
    throw error;
  }
};

export const updateUser: AppRouteHandler<UpdateUserRoute> = async (c) => {
  try {
    const data = await c.req.json();
    const res = await db
      .update(users)
      .set({
        name: data.name,
        email: data.email,
      })
      .where(eq(users.id, data.id))
      .returning();

    if (res.length === 0) {
      throw new Error("User not found");
    }

    const user = res[0]!;
    const token = await AuthHelper.generateJwtToken(user);
    return c.json(user, HttpStatusCodes.OK);
  } catch (error) {
    throw error;
  }
};
