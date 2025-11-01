import { sql, type CreateTableBuilder } from "kysely";

type BaseCols =
  | "id"
  | "created_at"
  | "created_by"
  | "updated_at"
  | "updated_by"
  | "deleted_at"
  | "deleted_by";

export function addBase<TB extends string, C extends string = never>(
  t: CreateTableBuilder<TB, C>
): CreateTableBuilder<TB, C | BaseCols> {
  return t
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("created_by", "varchar(50)", (col) => col.notNull())
    .addColumn("updated_at", "timestamp")
    .addColumn("updated_by", "varchar(50)")
    .addColumn("deleted_at", "timestamp")
    .addColumn("deleted_by", "varchar(50)");
}
