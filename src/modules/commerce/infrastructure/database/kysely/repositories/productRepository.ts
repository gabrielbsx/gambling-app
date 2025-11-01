import type { Product } from "@/modules/commerce/domain/entities/product.js";
import type { ProductRepository } from "@/modules/commerce/domain/repositories/productRepository.js";
import { KyselyRepository } from "@/shared/infrastructure/database/kysely/repositories/repository.js";
import { commerceDbClient } from "../config/dbClient.js";
import type { ProductTable } from "../data/product.js";
import { ProductRepositoryMapper } from "../mappers/productRepositoryMapper.js";

export class KyselyProductRepository
  extends KyselyRepository<Product, ProductTable>
  implements ProductRepository
{
  constructor() {
    super(commerceDbClient, "products", new ProductRepositoryMapper());
  }
}
