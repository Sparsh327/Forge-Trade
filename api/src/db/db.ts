import { drizzle } from "drizzle-orm/node-postgres";
import env from "@/env";
import { Pool } from "pg";
import * as schema from "./schema/schema";

const database = env.DATABASE_URL;
console.log("Connected to DB:", database);
const pool = new Pool({
  connectionString: database,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

export const db = drizzle({
  schema,
  client: pool,
  casing: "snake_case",
});
