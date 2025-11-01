import type { Controller } from "@/shared/application/contracts/controller.js";
import type {
  HttpMethod,
  Router,
} from "@/shared/application/contracts/router.js";
import { HttpException } from "@/shared/application/http/errors.js";
import type { FastifyInstance } from "fastify";

export class FastifyRouteAdapter implements Router {
  constructor(private readonly app: FastifyInstance) {}

  route(method: HttpMethod, url: string, controller: Controller<unknown>) {
    this.app.route({
      method,
      url,
      handler: async (request, reply) => {
        try {
          const httpRequest = {
            body: request.body,
            query: request.query,
            params: request.params,
            headers: request.headers,
          };

          const httpResponse = await controller.handle(httpRequest);

          reply.status(httpResponse.statusCode).send(httpResponse.body);
        } catch (error) {
          if (error instanceof HttpException) {
            return reply
              .status(error.statusCode)
              .send({ error: error.message });
          }

          reply.status(500).send({ error: "Internal Server Error" });
        }
      },
    });
  }
}
