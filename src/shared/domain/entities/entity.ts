export interface EntityProps {
  id: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

export abstract class Entity<TEntityProps> {
  public readonly props: TEntityProps & EntityProps;

  constructor(props: TEntityProps & EntityProps) {
    this.props = props;
  }
}
