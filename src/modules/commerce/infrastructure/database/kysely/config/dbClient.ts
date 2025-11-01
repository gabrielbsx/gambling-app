import { env } from "@/main/bootstrap/env.js";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { CommerceDatabase } from "../data/index.js";

export const commerceDbClient = new Kysely<CommerceDatabase>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: env.COMMERCE_DATABASE_URL,
      options: "-c search_path=commerce",
    }),
  }),
});
