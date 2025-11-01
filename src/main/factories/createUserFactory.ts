import { CreateUserUseCaseImpl } from "@/modules/identity/application/usecases/createUserUseCase.js";
import { KyselyUserRepository } from "@/modules/identity/infrastructure/database/kysely/repositories/userRepository.js";
import { JwtService } from "@/modules/identity/infrastructure/jwt/jwtService.js";
import { ZodCreateUserValidator } from "@/modules/identity/infrastructure/validators/zod/zodCreateUserValidator.js";
import { CreateUserControllerImpl } from "@/modules/identity/presentation/controllers/createUserController.js";

export class CreateUserFactory {
  static create() {
    const validator = new ZodCreateUserValidator();
    const repository = new KyselyUserRepository();
    const tokenService = new JwtService();
    const usecase = new CreateUserUseCaseImpl(repository, tokenService);
    const controller = new CreateUserControllerImpl(validator, usecase);

    return controller;
  }
}
