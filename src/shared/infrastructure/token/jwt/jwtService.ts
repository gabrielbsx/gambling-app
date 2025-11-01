import { env } from "@/main/bootstrap/env.js";
import type { TokenService } from "@/shared/application/contracts/tokenService.js";
import jwt from "jsonwebtoken";

export class JwtService implements TokenService {
  async generate<T = unknown>(data: T): Promise<string> {
    const token = jwt.sign({ data }, env.JWT_SECRET_KEY, {
      expiresIn: env.JWT_EXPIRES_IN,
    });

    return token;
  }

  async verify<T = unknown>(token: string): Promise<T> {
    const decoded = jwt.verify(token, env.JWT_SECRET_KEY) as {
      data: T;
    };

    return decoded.data;
  }
}
