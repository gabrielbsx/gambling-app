import type { Repository } from "@/shared/domain/repositories/repository.js";
import type { Product } from "../entities/product.js";

export interface ProductRepository extends Repository<string, Product> {}
