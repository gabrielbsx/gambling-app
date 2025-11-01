import { addBase } from "@/shared/infrastructure/database/kysely/migrations/base.js";
import { Kysely } from "kysely";
import type { CommerceDatabase } from "../data/index.js";

export async function up(db: Kysely<CommerceDatabase>): Promise<void> {
  await db.schema.createSchema("commerce").ifNotExists().execute();

  await db.schema
    .withSchema("commerce")
    .createTable("products")
    .ifNotExists()
    .$call(addBase)
    .addColumn("name", "varchar(50)", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<CommerceDatabase>): Promise<void> {
  await db.schema.dropSchema("commerce").ifExists().cascade().execute();
  await db.schema
    .withSchema("commerce")
    .dropTable("products")
    .ifExists()
    .execute();
}
