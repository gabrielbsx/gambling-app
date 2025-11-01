import { FileMigrationProvider, Migrator } from "kysely";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { commerceDbClient } from "./dbClient.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const commerceMigration = async () => {
  await commerceDbClient.schema
    .createSchema("commerce")
    .ifNotExists()
    .execute();

  const migrator = new Migrator({
    db: commerceDbClient,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "../migrations"),
    }),
    migrationTableSchema: "commerce",
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await commerceDbClient.destroy();
};
