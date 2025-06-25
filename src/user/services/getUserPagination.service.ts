import { Injectable } from '@nestjs/common';
import { DbException } from 'src/common/exceptions';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserDto } from '../dto/user.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetUserResDto } from '../dto/getUserRes.dto';

@Injectable()
export class GetUserPaginationService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async getUserPagination(
    page: number,
    perPage: number,
    order: number,
  ): Promise<GetUserResDto[]> {
    const result = await this.userRepository.pagedAsync({
      $page: page,
      $perPage: perPage,
      $orderBy: 'user_id',
      $order: order ? 'ASC' : 'DESC',
    });

    if (!result) {
      throw new DbException('data not found');
    }

    const response = this.mapper.mapArray(result.items, UserDto, GetUserResDto);

    return response;
  }
}
