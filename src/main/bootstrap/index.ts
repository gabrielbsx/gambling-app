import { commerceMigration } from "@/modules/commerce/infrastructure/database/kysely/config/migrator.js";
import { identityMigration } from "@/modules/identity/infrastructure/database/kysely/config/migrator.js";
import fastify from "fastify";
import { env } from "./env.js";
import { Routes } from "./routes.js";

class App {
  static api = fastify();

  static async run() {
    await App.migrate();
    const routes = new Routes(this.api);

    routes.setup();

    App.api.listen(
      {
        port: env.PORT,
      },
      (err, address) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        console.log(`Server listening at ${address}`);
      }
    );
  }

  static async migrate() {
    console.log("Running migrations");

    await identityMigration();
    await commerceMigration();

    console.log("Migration finished");
  }
}

App.run().catch(console.error);
