import { Pool } from "pg";

export const db = new Pool({
  host: "localhost",
  port: 5432,
  database: "food_pos",
  user: "postgres",
  password: "waihsu",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
