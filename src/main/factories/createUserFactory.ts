import { CreateUserUseCaseImpl } from "@/modules/identity/application/usecases/createUserUseCase.js";
import { KyselyUserRepository } from "@/modules/identity/infrastructure/database/kysely/repositories/userRepository.js";
import { ZodCreateUserValidator } from "@/modules/identity/infrastructure/validators/zod/zodCreateUserValidator.js";
import { CreateUserControllerImpl } from "@/modules/identity/presentation/controllers/createUserController.js";

export class CreateUserFactory {
  static create() {
    const validator = new ZodCreateUserValidator();
    const repository = new KyselyUserRepository();
    const usecase = new CreateUserUseCaseImpl(repository);
    const controller = new CreateUserControllerImpl(validator, usecase);

    return controller;
  }
}
