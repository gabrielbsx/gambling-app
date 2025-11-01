import { env } from "@/main/bootstrap/env.js";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { IdentityDatabase } from "../data/index.js";

export const identityDbClient = new Kysely<IdentityDatabase>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: env.IDENTITY_DATABASE_URL,
      options: "-c search_path=identity",
    }),
  }),
});