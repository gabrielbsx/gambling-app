import { sql } from "kysely";
import { fileURLToPath } from "node:url";
import { identityDbClient } from "./dbClient.js";

export async function identitySync(): Promise<void> {
  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`.execute(identityDbClient);

  await identityDbClient.schema
    .createSchema("identity")
    .ifNotExists()
    .execute();

  await identityDbClient.schema
    .withSchema("identity")
    .createTable("users")
    .ifNotExists()
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("created_by", "varchar(50)", (col) => col.notNull())
    .execute();

  await sql`ALTER TABLE identity.users ADD COLUMN IF NOT EXISTS name varchar(50)`.execute(
    identityDbClient
  );
  await sql`ALTER TABLE identity.users ADD COLUMN IF NOT EXISTS username varchar(50)`.execute(
    identityDbClient
  );
  await sql`ALTER TABLE identity.users ADD COLUMN IF NOT EXISTS email varchar(100)`.execute(
    identityDbClient
  );
  await sql`ALTER TABLE identity.users ADD COLUMN IF NOT EXISTS password varchar(50)`.execute(
    identityDbClient
  );
  await sql`ALTER TABLE identity.users ADD COLUMN IF NOT EXISTS updated_at timestamp`.execute(
    identityDbClient
  );
  await sql`ALTER TABLE identity.users ADD COLUMN IF NOT EXISTS updated_by varchar(50)`.execute(
    identityDbClient
  );
  await sql`ALTER TABLE identity.users ADD COLUMN IF NOT EXISTS deleted_at timestamp`.execute(
    identityDbClient
  );
  await sql`ALTER TABLE identity.users ADD COLUMN IF NOT EXISTS deleted_by varchar(50)`.execute(
    identityDbClient
  );
  await sql`ALTER TABLE identity.users ADD COLUMN IF NOT EXISTS phone varchar(20)`.execute(
    identityDbClient
  );

  await sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'users_username_unique'
          AND conrelid = 'identity.users'::regclass
      ) THEN
        ALTER TABLE identity.users
          ADD CONSTRAINT users_username_unique UNIQUE (username);
      END IF;
    END $$;
  `.execute(identityDbClient);

  await sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'users_email_unique'
          AND conrelid = 'identity.users'::regclass
      ) THEN
        ALTER TABLE identity.users
          ADD CONSTRAINT users_email_unique UNIQUE (email);
      END IF;
    END $$;
  `.execute(identityDbClient);
}

async function runDirect() {
  console.log("Running identity sync...");
  try {
    await identitySync();
    console.log("Identity sync finished successfully");
  } catch (err) {
    console.error("Identity sync failed");
    console.error(err);
    process.exit(1);
  } finally {
    await identityDbClient.destroy();
  }
}

const thisFile = fileURLToPath(import.meta.url);
if (process.argv[1] === thisFile) {
  await runDirect();
}
