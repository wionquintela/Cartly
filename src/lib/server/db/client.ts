import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema"; //instead of destructuring manually it just takes all data from schema

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not required for API routes.");
}

const sql = neon(databaseUrl);

export const db = drizzle({ client: sql, schema });
