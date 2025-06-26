import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { BaseRepo } from '../../common/base.repo';
import { Roles } from '../entities/roles.entity';
import { RolesDto } from '../dto/roles.dto';

@Injectable()
export class RolesRepository extends BaseRepo<Roles, RolesDto, number, {}, {}> {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    @InjectMapper()
    readonly mapper: Mapper,
    readonly logger: PinoLogger,
  ) {
    super(rolesRepository, mapper, logger, Roles, RolesDto);
  }

  public override get softDeleteEnabled(): boolean {
    return true;
  }

  public override get softDeleteColumnName(): keyof Roles {
    return 'deleted_at';
  }

  //   public mapToResponse(body: UserDto) {
  //     return this.mapper.map(body, UserDto, GetUserResDto);
  //   }

  //   public mapToResponseArray(body: UserDto[]) {
  //     return this.mapper.mapArray(body, UserDto, GetUserResDto);
  //   }
}
