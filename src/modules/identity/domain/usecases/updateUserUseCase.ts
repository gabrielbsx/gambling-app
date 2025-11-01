import type { UseCase } from "@/shared/domain/usecases/usecase.js";

export interface UpdateUserInput {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
}

export interface UpdateUserOutput {
  id: string;
  name: string;
  username: string;
  email: string;
}

export interface UpdateUserUseCase
  extends UseCase<UpdateUserInput, UpdateUserOutput> {}
