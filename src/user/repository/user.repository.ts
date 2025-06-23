import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { BaseRepo } from '../../common/base.repo';
import { User } from 'src/user/entities/user.entity';
import { UserDto } from 'src/user/dto/user.dto';

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
}
