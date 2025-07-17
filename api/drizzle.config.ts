import env from "./src/env";
import { defineConfig } from "drizzle-kit";
import path from "path";

export default defineConfig({
  schema: path.resolve(__dirname, "src/db/schema/schema.ts"),
  out: path.resolve(__dirname, "src/db/migrations"),
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: "postgresql://postgres:postgres@localhost:5434/forgePg",
  },
});
