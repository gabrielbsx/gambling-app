export type PageResult<TEntity> = {
  data: TEntity[];
  total: number;
  page: number;
  limit: number;
};

export type PaginationOptions = {
  page: number;
  limit: number;
};

export interface RepositoryMapper<TEntity, TModel> {
  toDomain(model: TModel): TEntity;
  toModel(entity: TEntity): TModel;
}

export interface Repository<TId, TEntity> {
  generateId(): Promise<TId>;
  findById(id: TId): Promise<TEntity | null>;
  save(entity: TEntity): Promise<void>;
  delete(id: TId, deletedBy?: string): Promise<void>;
  findAll(): Promise<TEntity[]>;
  update(entity: TEntity): Promise<void>;
  findPaginated(page: number, limit: number): Promise<PageResult<TEntity>>;
}
