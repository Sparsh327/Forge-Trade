import {
  integer,
  pgTable,
  varchar,
  uuid,
  boolean,
  numeric,
} from "drizzle-orm/pg-core";
import { timestamps } from "../column.helper";
import { InferSelectModel } from "drizzle-orm/table";

export const users = pgTable("users", {
  id: uuid().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  isEmailVerified: boolean().notNull().default(false),
  password: varchar({ length: 255 }),
  balance: numeric("amount", { precision: 20, scale: 8 })
    .notNull()
    .default("0"),
  ...timestamps,
});

export type User = InferSelectModel<typeof users>;

export const contact_us = pgTable("contact_us", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  message: varchar({ length: 255 }).notNull(),
  ...timestamps,
});
