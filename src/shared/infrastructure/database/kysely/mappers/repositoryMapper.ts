import type { Entity, EntityProps } from "@/shared/domain/entities/entity.js";
import type { Insertable, Selectable } from "kysely";
import type { BaseTable } from "../data/base.js";

function toDate(v?: Date | string | null): Date | undefined {
  if (v === null || v === undefined) return undefined;
  return v instanceof Date ? v : new Date(v as any);
}

export function fromBaseModel(m: Selectable<BaseTable>): EntityProps {
  const base: any = {
    id: m.id,
    createdAt:
      m.created_at instanceof Date
        ? m.created_at
        : new Date(m.created_at as any),
    createdBy: m.created_by,
  } satisfies Pick<EntityProps, "id" | "createdAt" | "createdBy">;

  const updatedAt = toDate(m.updated_at as any);
  if (updatedAt) base.updatedAt = updatedAt;
  const updatedBy = (m.updated_by ?? undefined) as string | undefined;
  if (updatedBy) base.updatedBy = updatedBy;

  const deletedAt = toDate(m.deleted_at as any);
  if (deletedAt) base.deletedAt = deletedAt;
  const deletedBy = (m.deleted_by ?? undefined) as string | undefined;
  if (deletedBy) base.deletedBy = deletedBy;

  return base as EntityProps;
}

export function toBaseModel<M extends BaseTable>(
  p: EntityProps
): Partial<Insertable<M>> {
  const base: Partial<Insertable<BaseTable>> = {
    id: p.id,
    created_at: p.createdAt,
    created_by: p.createdBy,
    updated_at: p.updatedAt ?? null,
    updated_by: p.updatedBy ?? null,
    deleted_at: p.deletedAt ?? null,
    deleted_by: p.deletedBy ?? null,
  };
  return base as unknown as Partial<Insertable<M>>;
}

export abstract class MapperBase<
  TEntityProps extends object,
  TModel extends BaseTable,
  TEntity extends Entity<TEntityProps>
> {
  toDomain(model: Selectable<TModel>): TEntity {
    const base = fromBaseModel(model as unknown as Selectable<BaseTable>);
    const specific = this.mapToDomainProps(model);
    return this.createEntity({
      ...(base as EntityProps),
      ...(specific as TEntityProps),
    });
  }

  toModel(entity: TEntity): Insertable<TModel> {
    const base = toBaseModel<TModel>(entity.props as EntityProps);
    const specific = this.mapToModel(entity);
    return {
      ...(specific as Insertable<TModel>),
      ...(base as Insertable<TModel>),
    };
  }

  protected abstract mapToDomainProps(model: Selectable<TModel>): TEntityProps;
  protected abstract mapToModel(entity: TEntity): Partial<Insertable<TModel>>;
  protected abstract createEntity(props: TEntityProps & EntityProps): TEntity;
}

export interface KyselyRepositoryMapper<TEntity, TModel extends BaseTable> {
  toDomain(model: Selectable<TModel>): TEntity;
  toModel(entity: TEntity): Insertable<TModel>;
}
