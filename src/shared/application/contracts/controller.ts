import type { HttpRequest, HttpResponse } from "./http.js";

export interface Controller<TOutput = unknown> {
  handle(input: HttpRequest): Promise<HttpResponse<TOutput>>;
}
