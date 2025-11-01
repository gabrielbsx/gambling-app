import { addBase } from "@/shared/infrastructure/database/kysely/migrations/base.js";
import { Kysely, sql } from "kysely";
import type { IdentityDatabase } from "../data/index.js";

export async function up(db: Kysely<IdentityDatabase>): Promise<void> {
  await db.schema.createSchema("identity").ifNotExists().execute();

  await db.schema
    .withSchema("identity")
    .createTable("users")
    .ifNotExists()
    .$call(addBase)
    .execute();

  await sql`ALTER TABLE identity.users ADD COLUMN IF NOT EXISTS name varchar(50)`.execute(
    db
  );
  await sql`ALTER TABLE identity.users ADD COLUMN IF NOT EXISTS username varchar(50)`.execute(
    db
  );
  await sql`ALTER TABLE identity.users ADD COLUMN IF NOT EXISTS email varchar(100)`.execute(
    db
  );
  await sql`ALTER TABLE identity.users ADD COLUMN IF NOT EXISTS password varchar(50)`.execute(
    db
  );
  await sql`ALTER TABLE identity.users ADD COLUMN IF NOT EXISTS updated_at timestamp`.execute(
    db
  );
  await sql`ALTER TABLE identity.users ADD COLUMN IF NOT EXISTS updated_by varchar(50)`.execute(
    db
  );
  await sql`ALTER TABLE identity.users ADD COLUMN IF NOT EXISTS deleted_at timestamp`.execute(
    db
  );
  await sql`ALTER TABLE identity.users ADD COLUMN IF NOT EXISTS deleted_by varchar(50)`.execute(
    db
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
  `.execute(db);

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
  `.execute(db);
}

export async function down(db: Kysely<IdentityDatabase>): Promise<void> {
  await db.schema.dropSchema("identity").ifExists().cascade().execute();
  await db.schema
    .withSchema("identity")
    .dropTable("users")
    .ifExists()
    .execute();
}
