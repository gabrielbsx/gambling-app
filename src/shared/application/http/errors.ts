export class HttpException extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = "HttpException";
    this.statusCode = statusCode;
  }
}

export class ConflictException extends HttpException {
  constructor(message: string) {
    super(message, 409);
    this.name = "ConflictException";
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(message, 403);
    this.name = "ForbiddenException";
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(message, 401);
    this.name = "UnauthorizedException";
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(message, 400);
    this.name = "BadRequestException";
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, 404);
    this.name = "NotFoundException";
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string) {
    super(message, 500);
    this.name = "InternalServerErrorException";
  }
}
