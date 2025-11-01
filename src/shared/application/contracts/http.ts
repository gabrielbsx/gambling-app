export interface HttpRequest {
  body?: unknown;
  query?: unknown;
  params?: unknown;
  headers?: unknown;
  files?: unknown;
}

export interface HttpResponse<T = unknown> {
  statusCode: number;
  body: T;
}
