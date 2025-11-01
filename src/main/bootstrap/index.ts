import fastify from "fastify";
import { env } from "./env.js";
import { Routes } from "./routes.js";

class App {
  static api = fastify();

  static run() {
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
}

App.run();
