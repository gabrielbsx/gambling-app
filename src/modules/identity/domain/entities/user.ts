import { Entity, type EntityProps } from "@/shared/domain/entities/entity.js";

export interface UserProps extends EntityProps {
  name: string;
  username: string;
  email: string;
  password: string;
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps) {
    super(props);
  }
}
