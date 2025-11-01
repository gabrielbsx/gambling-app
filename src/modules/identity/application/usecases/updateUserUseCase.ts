import type {
  UpdateUserInput,
  UpdateUserOutput,
  UpdateUserUseCase,
} from "../../domain/usecases/updateUserUseCase.js";

export class UpdateUserUseCaseImpl implements UpdateUserUseCase {
  async execute(input: UpdateUserInput): Promise<UpdateUserOutput> {
    return {
      id: input.id,
      name: input.name ?? "Updated Name",
      username: input.username ?? "updated_username",
      email: input.email ?? "updated_email@example.com",
    };
  }
}
