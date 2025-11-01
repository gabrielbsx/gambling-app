import { identityMigration } from "@/modules/identity/infrastructure/database/kysely/config/migrator.js";

await identityMigration()