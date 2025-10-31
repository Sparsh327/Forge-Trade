import {
  integer,
  pgTable,
  varchar,
  uuid,
  boolean,
  numeric,
  bigint,
} from "drizzle-orm/pg-core";
import { timestamps } from "../column.helper";
import { InferSelectModel } from "drizzle-orm/table";

export const users = pgTable("users", {
  id: uuid().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  isEmailVerified: boolean().notNull().default(false),
  password: varchar({ length: 255 }),
  ...timestamps,
});

export type User = InferSelectModel<typeof users>;

export const balance = pgTable("balance", {
  id: uuid().primaryKey(),
  available: numeric("available", { precision: 20, scale: 8 })
    .notNull()
    .default("0"),
  locked: numeric("locked", { precision: 20, scale: 8 }).notNull().default("0"),
  currency: varchar({ length: 255 }).notNull(),
  userId: uuid().references(() => users.id, { onDelete: "cascade" }),
  ...timestamps,
});

export type Balance = InferSelectModel<typeof balance>;

// Orders Table - Order history
export const orders = pgTable("orders", {
  id: uuid().primaryKey(),
  orderId: varchar({ length: 100 }).notNull().unique(), // From engine
  userId: uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  market: varchar({ length: 50 }).notNull(), // "TATA_INR"
  side: varchar({ length: 10 }).notNull(), // "buy" or "sell"
  price: numeric("price", { precision: 20, scale: 8 }).notNull(),
  quantity: numeric("quantity", { precision: 20, scale: 8 }).notNull(),
  filled: numeric("filled", { precision: 20, scale: 8 }).notNull().default("0"),
  status: varchar({ length: 20 }).notNull().default("pending"), // "pending", "filled", "partial", "cancelled"
  ...timestamps,
});

export type Order = InferSelectModel<typeof orders>;

// Trades Table - Execution records
export const trades = pgTable("trades", {
  id: uuid().primaryKey(),
  tradeId: varchar({ length: 100 }).notNull().unique(), // From engine
  market: varchar({ length: 50 }).notNull(), // "TATA_INR"
  price: numeric("price", { precision: 20, scale: 8 }).notNull(),
  quantity: numeric("quantity", { precision: 20, scale: 8 }).notNull(),
  quoteQuantity: numeric("quote_quantity", {
    precision: 20,
    scale: 8,
  }).notNull(), // price * quantity
  isBuyerMaker: boolean(), // true if buyer placed order first
  buyerId: uuid().references(() => users.id),
  sellerId: uuid().references(() => users.id),
  buyerOrderId: varchar({ length: 100 }),
  sellerOrderId: varchar({ length: 100 }),
  timestamp: bigint({ mode: "number" }).notNull(), // Unix timestamp from engine
  ...timestamps,
});

export type Trade = InferSelectModel<typeof trades>;

// Transactions Table - Money movements
export const transactions = pgTable("transactions", {
  id: uuid().primaryKey(),
  userId: uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  type: varchar({ length: 20 }).notNull(), // "deposit", "withdrawal", "initial_credit", "trade"
  asset: varchar({ length: 50 }).notNull(), // "INR", "TATA"
  amount: numeric("amount", { precision: 20, scale: 8 }).notNull(),
  status: varchar({ length: 20 }).notNull().default("completed"), // "pending", "completed", "failed"
  referenceId: varchar({ length: 100 }), // Order ID or trade ID reference
  ...timestamps,
});

export type Transaction = InferSelectModel<typeof transactions>;

export const contact_us = pgTable("contact_us", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  message: varchar({ length: 255 }).notNull(),
  ...timestamps,
});
