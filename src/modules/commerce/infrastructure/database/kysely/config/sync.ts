import { sql } from "kysely";
import { fileURLToPath } from "node:url";
import { commerceDbClient } from "./dbClient.js";

export async function commerceSync(): Promise<void> {
  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`.execute(commerceDbClient);

  await commerceDbClient.schema
    .createSchema("commerce")
    .ifNotExists()
    .execute();

  await commerceDbClient.schema
    .withSchema("commerce")
    .createTable("products")
    .ifNotExists()
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("created_by", "varchar(50)", (col) => col.notNull())
    .execute();

  await sql`ALTER TABLE commerce.products ADD COLUMN IF NOT EXISTS name varchar(50)`.execute(
    commerceDbClient
  );
  await sql`ALTER TABLE commerce.products ADD COLUMN IF NOT EXISTS description varchar(200)`.execute(
    commerceDbClient
  );
  await sql`ALTER TABLE commerce.products ADD COLUMN IF NOT EXISTS value decimal`.execute(
    commerceDbClient
  );
  await sql`ALTER TABLE commerce.products ADD COLUMN IF NOT EXISTS amount integer`.execute(
    commerceDbClient
  );
  await sql`ALTER TABLE commerce.products ADD COLUMN IF NOT EXISTS sku varchar(50)`.execute(
    commerceDbClient
  );

  await sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'products_sku_unique'
          AND conrelid = 'commerce.products'::regclass
      ) THEN
        ALTER TABLE commerce.products
          ADD CONSTRAINT products_sku_unique UNIQUE (sku);
      END IF;
    END $$;
  `.execute(commerceDbClient);
}

async function runDirect() {
  console.log("Running commerce sync...");
  try {
    await commerceSync();
    console.log("Commerce sync finished successfully");
  } catch (err) {
    console.error("Commerce sync failed");
    console.error(err);
    process.exit(1);
  } finally {
    await commerceDbClient.destroy();
  }
}

const thisFile = fileURLToPath(import.meta.url);
if (process.argv[1] === thisFile) {
  await runDirect();
}
