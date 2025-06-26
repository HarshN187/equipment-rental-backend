import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { BaseRepo } from '../../common/base.repo';
import { Permissions } from '../entities/permissions.entity';
import { PermissionDto } from '../dto/permission.dto';

@Injectable()
export class PermissionRepository extends BaseRepo<
  Permissions,
  PermissionDto,
  number,
  {},
  {}
> {
  constructor(
    @InjectRepository(Permissions)
    private readonly permissionRepository: Repository<Permissions>,
    @InjectMapper()
    readonly mapper: Mapper,
    readonly logger: PinoLogger,
  ) {
    super(permissionRepository, mapper, logger, Permissions, PermissionDto);
  }

  public override get softDeleteEnabled(): boolean {
    return true;
  }

  public override get softDeleteColumnName(): keyof Permissions     {
    return 'deleted_at';
  }

  //   public mapToResponse(body: UserDto) {
  //     return this.mapper.map(body, UserDto, GetUserResDto);
  //   }

  //   public mapToResponseArray(body: UserDto[]) {
  //     return this.mapper.mapArray(body, UserDto, GetUserResDto);
  //   }
}
