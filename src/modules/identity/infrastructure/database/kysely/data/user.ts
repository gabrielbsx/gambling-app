import type { BaseTable } from "@/shared/infrastructure/database/kysely/data/base.js";
import type { Selectable } from "kysely";

export interface UserTable extends BaseTable {
  name: string;
  username: string;
  email: string;
  password: string;
}

export type UserData = Selectable<UserTable>;
