import { Kysely, sql } from "kysely";
import type { IdentityDatabase } from "../data/index.js";

export async function up(db: Kysely<IdentityDatabase>): Promise<void> {
  await db.schema.createSchema("identity").ifNotExists().execute();

  await db.schema
    .withSchema("identity")
    .createTable("users")
    .ifNotExists()
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("name", "varchar(50)", (col) => col.notNull())
    .addColumn("username", "varchar(50)", (col) => col.notNull().unique())
    .addColumn("email", "varchar(100)", (col) => col.notNull().unique())
    .addColumn("password", "varchar(50)", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("created_by", "varchar(50)", (col) => col.notNull())
    .addColumn("updated_at", "timestamp")
    .addColumn("updated_by", "varchar(50)")
    .addColumn("deleted_at", "timestamp")
    .addColumn("deleted_by", "varchar(50)")
    .execute();
}

export async function down(db: Kysely<IdentityDatabase>): Promise<void> {
  await db.schema.dropSchema("identity").ifExists().cascade().execute();
  await db.schema
    .withSchema("identity")
    .dropTable("users")
    .ifExists()
    .execute();
}
