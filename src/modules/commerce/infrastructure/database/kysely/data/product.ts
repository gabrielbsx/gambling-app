import type { BaseTable } from "@/shared/infrastructure/database/kysely/data/base.js";
import type { Selectable } from "kysely";

export interface ProductTable extends BaseTable {
  name: string;
  description: string;
  amount: number;
  value: number;
}

export type ProductData = Selectable<ProductTable>;
