import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { BaseRepo } from '../../common/base.repo';
import { User } from 'src/user/entities/user.entity';
import { UserDto } from 'src/user/dto/user.dto';
import { Address } from 'src/user/entities/address.entity';
import { AddressDto } from 'src/user/dto/address.dto';

@Injectable()
export class AddressRepository extends BaseRepo<
  Address,
  AddressDto,
  number,
  {},
  {}
> {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectMapper()
    readonly mapper: Mapper,
    readonly logger: PinoLogger,
  ) {
    super(addressRepository, mapper, logger, Address, AddressDto);
  }
}
