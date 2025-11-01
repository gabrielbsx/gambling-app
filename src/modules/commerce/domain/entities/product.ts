import { Entity, type EntityProps } from "@/shared/domain/entities/entity.js";

export interface ProductProps extends EntityProps {
  name: string;
  description: string;
  value: number;
  amount: number;
}

export class Product extends Entity<ProductProps> {
  constructor(props: ProductProps) {
    super(props);
  }
}
