import { Injectable } from '@nestjs/common';
import { DbException } from 'src/common/exceptions';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class GetUserPaginationService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserPagination(page: number, perPage: number): Promise<UserDto[]> {
    const result = await this.userRepository.pagedAsync({
      $page: page,
      $perPage: perPage,
    });
    if (!result) {
      throw new DbException('data not found');
    }
    console.log(result);

    return result.items;
  }
}
