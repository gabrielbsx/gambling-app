import { addBase } from "@/shared/infrastructure/database/kysely/migrations/base.js";
import { Kysely, sql } from "kysely";
import type { CommerceDatabase } from "../data/index.js";

export async function up(db: Kysely<CommerceDatabase>): Promise<void> {
  await db.schema.createSchema("commerce").ifNotExists().execute();

  await db.schema
    .withSchema("commerce")
    .createTable("products")
    .ifNotExists()
    .$call(addBase)
    .execute();

  await sql`ALTER TABLE commerce.products ADD COLUMN IF NOT EXISTS name varchar(50)`.execute(
    db
  );
  await sql`ALTER TABLE commerce.products ADD COLUMN IF NOT EXISTS description varchar(200)`.execute(
    db
  );
  await sql`ALTER TABLE commerce.products ADD COLUMN IF NOT EXISTS value decimal`.execute(
    db
  );
  await sql`ALTER TABLE commerce.products ADD COLUMN IF NOT EXISTS amount integer`.execute(
    db
  );
}

export async function down(db: Kysely<CommerceDatabase>): Promise<void> {
  await db.schema.dropSchema("commerce").ifExists().cascade().execute();
  await db.schema
    .withSchema("commerce")
    .dropTable("products")
    .ifExists()
    .execute();
}
