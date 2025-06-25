import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { BaseRepo } from '../../common/base.repo';
import { User } from 'src/user/entities/user.entity';
import { UserDto } from 'src/user/dto/user.dto';
import { GetUserResDto } from '../dto/getUserRes.dto';

@Injectable()
export class UserRepository extends BaseRepo<User, UserDto, number, {}, {}> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectMapper()
    readonly mapper: Mapper,
    readonly logger: PinoLogger,
  ) {
    super(userRepository, mapper, logger, User, UserDto);
  }

  public override get softDeleteEnabled(): boolean {
    return true;
  }

  public override get idColumnName(): keyof User {
    return 'user_id';
  }

  public override get softDeleteColumnName(): keyof User {
    return 'deleted_at';
  }

  public mapToResponse(body: UserDto) {
    return this.mapper.map(body, UserDto, GetUserResDto);
  }

  public mapToResponseArray(body: UserDto[]) {
    return this.mapper.mapArray(body, UserDto, GetUserResDto);
  }
}
