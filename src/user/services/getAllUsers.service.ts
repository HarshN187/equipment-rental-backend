import { Injectable } from '@nestjs/common';
import { DbException } from 'src/common/exceptions';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserDto } from '../dto/user.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetUserResDto } from '../dto/getUserRes.dto';

@Injectable()
export class GetAllUserService {
  constructor(
    private readonly userRepo: UserRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async getAllUser(): Promise<GetUserResDto[]> {
    const result = await this.userRepo.allAsync({});
    if (!result) {
      throw new DbException('data not found');
    }

    const response = this.mapper.mapArray(result, UserDto, GetUserResDto);

    return response;
  }
}
