import { Injectable } from '@nestjs/common';
import { DbException } from 'src/common/exceptions';
import { AddressRepository } from '../repository/address.repository';
import { AddressDto } from '../dto/address.dto';
import { UserRepository } from '../repository/user.repository';
import { UserDto } from '../dto/user.dto';
import { ILike, Like } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetUserResDto } from '../dto/getUserRes.dto';

@Injectable()
export class FindUserBySearchService {
  constructor(private readonly userRepo: UserRepository) {}

  async findUser(query: string): Promise<GetUserResDto[]> {
    const result = await this.userRepo.allAsync({
      name: ILike(`%${query}%`),
      email: ILike(`%${query}%`),
    });

    if (!result) {
      throw new DbException('data not found');
    }

    const response = this.userRepo.mapToResponseArray(result);

    return response;
  }
}
