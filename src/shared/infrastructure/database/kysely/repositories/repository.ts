import type { Repository } from "@/shared/domain/repositories/repository.js";
import { randomUUID } from "crypto";
import type { Kysely, Selectable } from "kysely";
import type { BaseTable } from "../data/base.js";
import type { KyselyRepositoryMapper } from "../mappers/repositoryMapper.js";

export class KyselyRepository<TEntity, TModel extends BaseTable>
  implements Repository<string, TEntity>
{
  constructor(
    protected readonly dbClient: Kysely<any>,
    protected readonly tableName: string,
    protected readonly mapper: KyselyRepositoryMapper<TEntity, TModel>
  ) {}

  async generateId(): Promise<string> {
    return Promise.resolve(randomUUID());
  }

  async findById(id: string): Promise<TEntity | null> {
    const data = await this.dbClient
      .selectFrom(this.tableName)
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    return data
      ? this.mapper.toDomain(data as unknown as Selectable<TModel>)
      : null;
  }

  async save(entity: TEntity): Promise<void> {
    const model = this.mapper.toModel(entity);

    await this.dbClient
      .insertInto(this.tableName)
      .values(model as any)
      .execute();
  }

  async delete(id: string, deletedBy: string = "system"): Promise<void> {
    await this.dbClient
      .updateTable(this.tableName)
      .set({
        deleted_at: new Date(),
        deleted_by: deletedBy,
      } as unknown as TModel)
      .where("id", "=", id)
      .execute();
  }

  async findAll(): Promise<TEntity[]> {
    const data = (await this.dbClient
      .selectFrom(this.tableName)
      .selectAll()
      .execute()) as unknown as Selectable<TModel>[];

    return data.map((item) => this.mapper.toDomain(item));
  }

  async update(entity: TEntity): Promise<void> {
    const model = this.mapper.toModel(entity) as TModel;

    await this.dbClient
      .updateTable(this.tableName)
      .set(model)
      .where("id", "=", model.id)
      .execute();
  }

  async findPaginated(
    page: number,
    limit: number
  ): Promise<{ data: TEntity[]; total: number; page: number; limit: number }> {
    const offset = (page - 1) * limit;

    const [data, totalResult] = await Promise.all([
      this.dbClient
        .selectFrom(this.tableName)
        .selectAll()
        .offset(offset)
        .limit(limit)
        .execute() as Promise<Selectable<TModel>[]>,
      this.dbClient
        .selectFrom(this.tableName)
        .select(this.dbClient.fn.count<number>("id").as("total"))
        .executeTakeFirst(),
    ]);

    const total = totalResult ? Number(totalResult.total) : 0;

    return {
      data: data.map((item) => this.mapper.toDomain(item)),
      total,
      page,
      limit,
    };
  }
}
