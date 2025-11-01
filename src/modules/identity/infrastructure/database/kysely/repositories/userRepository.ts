import type { User } from "@/modules/identity/domain/entities/user.js";
import type { UserRepository } from "@/modules/identity/domain/repositories/userRepository.js";
import { KyselyRepository } from "@/shared/infrastructure/database/kysely/repositories/repository.js";
import { identityDbClient } from "../config/dbClient.js";
import type { UserTable } from "../data/user.js";
import { UserRepositoryMapper } from "../mappers/userRepositoryMapper.js";

export class KyselyUserRepository
  extends KyselyRepository<User, UserTable>
  implements UserRepository
{
  constructor() {
    super(identityDbClient, "users", new UserRepositoryMapper());
  }
}
