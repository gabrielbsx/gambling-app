import { commerceMigration } from "@/modules/commerce/infrastructure/database/kysely/config/migrator.js";
import { identityMigration } from "@/modules/identity/infrastructure/database/kysely/config/migrator.js";

console.log("Running migrations");

await identityMigration();
await commerceMigration();

console.log("Migration finished");
