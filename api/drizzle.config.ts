import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./api/src/db/schema/schema.ts", // 👈 fix here
  out: "./api/src/db/migrations", // 👈 fix here too
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: "postgresql://postgres:postgres@localhost:5434/forgePg",
  },
});
