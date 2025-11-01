import type { ColumnType } from "kysely";

export interface BaseTable {
  id: string;
  created_at: Date;
  created_by: string;
  updated_at?: ColumnType<
    Date | null,
    Date | string | null | undefined,
    Date | string | null | undefined
  >;
  updated_by?: ColumnType<
    string | null,
    string | null | undefined,
    string | null | undefined
  >;
  deleted_at?: ColumnType<
    Date | null,
    Date | string | null | undefined,
    Date | string | null | undefined
  >;
  deleted_by?: ColumnType<
    string | null,
    string | null | undefined,
    string | null | undefined
  >;
}
