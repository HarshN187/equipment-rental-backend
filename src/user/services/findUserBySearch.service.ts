import { Injectable } from '@nestjs/common';
import { DbException } from 'src/common/exceptions';
import { AddressRepository } from '../repository/address.repository';
import { AddressDto } from '../dto/address.dto';
import { UserRepository } from '../repository/user.repository';
import { UserDto } from '../dto/user.dto';
import { Like } from 'typeorm';

@Injectable()
export class FindUserBySearchService {
  constructor(private readonly userRepo: UserRepository) {}

  async findUser(query: string): Promise<UserDto[]> {
    const result = await this.userRepo.allAsync({
      name: Like(`%${query}%`),
      email: Like(`%${query}%`),
    });

    if (!result) {
      throw new DbException('data not found');
    }

    return result;
  }
}
