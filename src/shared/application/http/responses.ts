import type { HttpResponse } from "../contracts/http.js";

export interface Ok<T> extends HttpResponse<T> {
  statusCode: 200;
}

export interface Created<T> extends HttpResponse<T> {
  statusCode: 201;
}

export interface NoContent extends HttpResponse<null> {
  statusCode: 204;
  body: null;
}

export const ok = <T>(body: T): Ok<T> => ({
  statusCode: 200,
  body,
});

export const created = <T>(body: T): Created<T> => ({
  statusCode: 201,
  body,
});

export const noContent = (): NoContent => ({
  statusCode: 204,
  body: null,
});
