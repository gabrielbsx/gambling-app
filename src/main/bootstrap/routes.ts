import { FastifyRouteAdapter } from "@/shared/infrastructure/http/fastifyRouteAdapter.js";
import type { FastifyInstance } from "fastify";
import { CreateUserFactory } from "../factories/createUserFactory.js";

export class Routes {
  constructor(private readonly app: FastifyInstance) {}

  setup() {
    const fastifyRouteAdapter = new FastifyRouteAdapter(this.app);
    fastifyRouteAdapter.route("POST", "/users", CreateUserFactory.create());
  }
}
