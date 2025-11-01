import { commerceMigration } from "@/modules/commerce/infrastructure/database/kysely/config/migrator.js";
import { identityMigration } from "@/modules/identity/infrastructure/database/kysely/config/migrator.js";

await identityMigration();
await commerceMigration();
