export interface TokenService {
  generate<T = unknown>(data: T): Promise<string>;
  verify<T = unknown>(token: string): Promise<T>;
}
