import { Injectable } from '@nestjs/common';
import { DbException } from 'src/common/exceptions';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class GetUserByIdService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: number) {
    const result = await this.userRepository.getAsync(userId);
    if (!result) {
      throw new DbException('data not found');
    }

    return result;
  }
}
