import type { CreateUserInput } from "@/modules/identity/domain/usecases/createUserUseCase.js";
import type { Validator } from "@/shared/presentation/contracts/validator.js";

export interface CreateUserValidator extends Validator<CreateUserInput> {}
