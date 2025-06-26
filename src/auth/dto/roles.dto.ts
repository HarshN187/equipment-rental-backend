import { AutoMap } from '@automapper/classes';

export class RolesDto {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;
}
