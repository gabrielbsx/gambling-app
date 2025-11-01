import {
  User,
  type UserProps,
} from "@/modules/identity/domain/entities/user.js";
import type { EntityProps } from "@/shared/domain/entities/entity.js";
import {
  MapperBase,
  type KyselyRepositoryMapper,
} from "@/shared/infrastructure/database/kysely/mappers/repositoryMapper.js";
import type { Insertable, Selectable } from "kysely";
import type { UserTable } from "../data/user.js";

type UserSpecificProps = Omit<UserProps, keyof EntityProps>;

export class UserRepositoryMapper
  extends MapperBase<UserSpecificProps, UserTable, User>
  implements KyselyRepositoryMapper<User, UserTable>
{
  protected mapToDomainProps(model: Selectable<UserTable>) {
    return {
      name: model.name,
      username: model.username,
      email: model.email,
      password: model.password,
    } satisfies Partial<UserProps> as any;
  }

  protected mapToModel(entity: User): Partial<Insertable<UserTable>> {
    return {
      name: entity.props.name,
      username: entity.props.username,
      email: entity.props.email,
      password: entity.props.password,
    };
  }

  protected createEntity(props: UserProps): User {
    return new User(props);
  }
}
