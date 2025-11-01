import {
  Product,
  type ProductProps,
} from "@/modules/commerce/domain/entities/product.js";
import type { EntityProps } from "@/shared/domain/entities/entity.js";
import {
  MapperBase,
  type KyselyRepositoryMapper,
} from "@/shared/infrastructure/database/kysely/mappers/repositoryMapper.js";
import type { Insertable, Selectable } from "kysely";
import type { ProductTable } from "../data/product.js";

type ProductSpecificProps = Omit<ProductProps, keyof EntityProps>;

export class ProductRepositoryMapper
  extends MapperBase<ProductSpecificProps, ProductTable, Product>
  implements KyselyRepositoryMapper<Product, ProductTable>
{
  protected mapToDomainProps(model: Selectable<ProductTable>) {
    return {
      name: model.name,
      description: model.description,
      amount: model.amount,
      value: model.value,
    } satisfies Partial<ProductProps> as any;
  }

  protected mapToModel(entity: Product): Partial<Insertable<ProductTable>> {
    return {
      name: entity.props.name,
      description: entity.props.description,
      amount: entity.props.amount,
      value: entity.props.value,
    };
  }

  protected createEntity(props: ProductProps): Product {
    return new Product(props);
  }
}
