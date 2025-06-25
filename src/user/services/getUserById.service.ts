import { Injectable } from '@nestjs/common';
import { DbException } from 'src/common/exceptions';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserDto } from '../dto/user.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetUserResDto } from '../dto/getUserRes.dto';

@Injectable()
export class GetUserByIdService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: number): Promise<GetUserResDto> {
    const result = await this.userRepository.getAsyncWithJoin(userId, [
      'addresses',
      'rentals',
    ]);

    // console.log(result);
    if (!result) {
      throw new DbException('data not found');
    }

    const response = this.userRepository.mapToResponse(result);

    return response;
  }
}
