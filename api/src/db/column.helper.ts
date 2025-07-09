import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
};
