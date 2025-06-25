import { Injectable } from '@nestjs/common';
import { DbException } from 'src/common/exceptions';
import { AddressRepository } from '../repository/address.repository';
import { AddressDto } from '../dto/address.dto';
import { UserRepository } from '../repository/user.repository';
import { UserDto } from '../dto/user.dto';
import { Like } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetUserResDto } from '../dto/getUserRes.dto';

@Injectable()
export class FindUserBySearchService {
  constructor(
    private readonly userRepo: UserRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async findUser(query: string): Promise<GetUserResDto[]> {
    const result = await this.userRepo.allAsync({
      name: Like(`%${query}%`),
      email: Like(`%${query}%`),
    });

    if (!result) {
      throw new DbException('data not found');
    }

    const response = this.mapper.mapArray(result, UserDto, GetUserResDto);

    return response;
  }
}
