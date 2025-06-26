import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { BaseRepo } from '../../common/base.repo';
import { RolesPermission } from '../entities/roles_permission.entity';
import { RolesPermissionDto } from '../dto/rolesPermission.dto';

@Injectable()
export class RolesPermissionRepository extends BaseRepo<
  RolesPermission,
  RolesPermissionDto,
  number,
  {},
  {}
> {
  constructor(
    @InjectRepository(RolesPermission)
    private readonly rolesPerRepository: Repository<RolesPermission>,
    @InjectMapper()
    readonly mapper: Mapper,
    readonly logger: PinoLogger,
  ) {
    super(
      rolesPerRepository,
      mapper,
      logger,
      RolesPermission,
      RolesPermissionDto,
    );
  }

  public override get softDeleteEnabled(): boolean {
    return true;
  }

  public override get softDeleteColumnName(): keyof RolesPermission {
    return 'deleted_at';
  }

  //   public mapToResponse(body: UserDto) {
  //     return this.mapper.map(body, UserDto, GetUserResDto);
  //   }

  //   public mapToResponseArray(body: UserDto[]) {
  //     return this.mapper.mapArray(body, UserDto, GetUserResDto);
  //   }
}
