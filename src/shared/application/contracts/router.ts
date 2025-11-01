import type { Controller } from "./controller.js";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface Router {
  route(method: HttpMethod, url: string, controller: Controller<unknown>): void;
}
