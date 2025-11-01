import { User } from "@/modules/identity/domain/entities/user.js";
import type { UserRepository } from "@/modules/identity/domain/repositories/userRepository.js";
import type {
  CreateUserInput,
  CreateUserOutput,
  CreateUserUseCase,
} from "@/modules/identity/domain/usecases/createUserUseCase.js";
import type { TokenService } from "../contracts/tokenizer/tokenService.js";

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const userId = await this.userRepository.generateId();

    const user = new User({
      id: userId,
      name: input.name,
      username: input.username,
      email: input.email,
      password: input.password,
      createdBy: "system",
      createdAt: new Date(),
    });

    await this.userRepository.save(user);

    const userWithoutPassword = {
      ...user.props,
      password: undefined,
    };

    const token = await this.tokenService.generate(userWithoutPassword);

    return {
      id: userWithoutPassword.id,
      token,
    };
  }
}
