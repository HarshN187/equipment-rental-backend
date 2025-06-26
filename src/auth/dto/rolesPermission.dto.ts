import { AutoMap } from '@automapper/classes';
import { RolesDto } from './roles.dto';
import { PermissionDto } from './permission.dto';

export class RolesPermissionDto {
  @AutoMap()
  id: number;

  @AutoMap()
  role: RolesDto;

  @AutoMap()
  permission: PermissionDto;
}
