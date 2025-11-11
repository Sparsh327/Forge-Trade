import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5434,
  database: "forgePg",
  user: "postgres",
  password: "postgres",
});

export default pool;
