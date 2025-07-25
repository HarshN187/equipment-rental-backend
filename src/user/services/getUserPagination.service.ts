import { Injectable } from '@nestjs/common';
import { DbException } from 'src/common/exceptions';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserDto } from '../dto/user.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetUserResDto } from '../dto/getUserRes.dto';

@Injectable()
export class GetUserPaginationService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserPagination(
    page: number,
    perPage: number,
    order: number,
    query: string,
  ) {
    let searchQuery = {};
    if (query) {
      searchQuery['name'] = query;
    }

    const result = await this.userRepository.pagedAsync({
      $page: page,
      $perPage: perPage,
      $orderBy: 'user_id',
      $order: order ? 'ASC' : 'DESC',
      role: { name: 'user' },
      ...searchQuery,
    });

    if (!result) {
      throw new DbException('data not found');
    }

    const userCount = await this.userRepository.countAsync({});

    const response = this.userRepository.mapToResponseArray(result.items);

    return { userData: [...response], total_count: userCount };
  }
}
