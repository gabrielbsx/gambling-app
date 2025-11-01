import type {
  HttpRequest,
  HttpResponse,
} from "@/shared/application/contracts/http.js";
import { BadRequestException } from "@/shared/application/http/errors.js";
import { created } from "@/shared/application/http/responses.js";
import type { CreateUserController } from "../../application/contracts/controllers/createUserController.js";
import type {
  CreateUserOutput,
  CreateUserUseCase,
} from "../../domain/usecases/createUserUseCase.js";
import type { CreateUserValidator } from "../contracts/validators/createUserValidator.js";

export class CreateUserControllerImpl implements CreateUserController {
  constructor(
    private readonly createUserValidator: CreateUserValidator,
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<CreateUserOutput>> {
    const validatedInput = await this.createUserValidator.validate(
      request.body
    );

    if (!validatedInput) {
      throw new BadRequestException("Invalid input");
    }

    return created(await this.createUserUseCase.execute(validatedInput));
  }
}
