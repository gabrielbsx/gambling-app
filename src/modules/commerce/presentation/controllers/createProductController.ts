import type {
  HttpRequest,
  HttpResponse,
} from "@/shared/application/contracts/http.js";
import { BadRequestException } from "@/shared/application/http/errors.js";
import { created } from "@/shared/application/http/responses.js";
import type { CreateProductController } from "../../application/contracts/controllers/createProductController.js";
import type {
  CreateProductOutput,
  CreateProductUseCase,
} from "../../domain/usecases/createProductUseCase.js";
import type { CreateProductValidator } from "../contracts/validators/createProductValidator.js";

export class CreateProductControllerImpl implements CreateProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly createProductValidator: CreateProductValidator
  ) {}

  async handle(input: HttpRequest): Promise<HttpResponse<CreateProductOutput>> {
    const validatedInput = await this.createProductValidator.validate(input);

    if (!validatedInput) {
      throw new BadRequestException("Invalid input");
    }

    return created(await this.createProductUseCase.execute(validatedInput));
  }
}
