import type { UseCase } from "@/shared/domain/usecases/usecase.js";

export type CreateUserInput = Readonly<{
  name: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}>;

export type CreateUserOutput = Readonly<{
  id: string;
  token: string;
}>;

export interface CreateUserUseCase
  extends UseCase<CreateUserInput, CreateUserOutput> {}
