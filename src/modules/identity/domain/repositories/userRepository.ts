import type { Repository } from "@/shared/domain/repositories/repository.js";
import type { User } from "../entities/user.js";

export interface UserRepository extends Repository<string, User> {}
