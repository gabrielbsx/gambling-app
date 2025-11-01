import type { CreateUserOutput } from "@/modules/identity/domain/usecases/createUserUseCase.js";
import type { Controller } from "@/shared/application/contracts/controller.js";

export interface CreateUserController extends Controller<CreateUserOutput> {}
