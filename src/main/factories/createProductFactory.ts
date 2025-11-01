import { CreateProductUseCaseImpl } from "@/modules/commerce/application/usecases/createProductUseCase.js";
import { KyselyProductRepository } from "@/modules/commerce/infrastructure/database/kysely/repositories/productRepository.js";
import { ZodCreateProductValidator } from "@/modules/commerce/infrastructure/validators/zod/zodCreateProductValidator.js";
import { CreateProductControllerImpl } from "@/modules/commerce/presentation/controllers/createProductController.js";

export class CreateProductFactory {
  static create() {
    const validator = new ZodCreateProductValidator();
    const repository = new KyselyProductRepository();
    const usecase = new CreateProductUseCaseImpl(repository);
    const controller = new CreateProductControllerImpl(validator, usecase);

    return controller;
  }
}
