import { Injectable } from '@nestjs/common';
import { DbException } from 'src/common/exceptions';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserDto } from '../dto/user.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetUserResDto } from '../dto/getUserRes.dto';

@Injectable()
export class GetUserByIdService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async getUserById(userId: number): Promise<GetUserResDto> {
    const result = await this.userRepository.getAsyncWithJoin(userId, [
      'addresses',
      'rentals',
    ]);

    // console.log(result);
    if (!result) {
      throw new DbException('data not found');
    }

    const response = this.mapper.map(result, UserDto, GetUserResDto);

    return response;
  }
}
