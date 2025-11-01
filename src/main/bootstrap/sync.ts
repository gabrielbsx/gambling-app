import { commerceSync } from "@/modules/commerce/infrastructure/database/kysely/config/sync.js";
import { identitySync } from "@/modules/identity/infrastructure/database/kysely/config/sync.js";

console.log("Running dev sync (modules orchestration)...");

try {
  await identitySync();
  await commerceSync();
  console.log("Dev sync finished successfully");
} catch (err) {
  console.error("Dev sync failed");
  console.error(err);
  process.exit(1);
}
