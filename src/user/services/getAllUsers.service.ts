import { Injectable } from '@nestjs/common';
import { DbException } from 'src/common/exceptions';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class GetAllUserService {
  constructor(private readonly userRepo: UserRepository) {}

  async getAllUser(): Promise<UserDto[]> {
    const result = await this.userRepo.allAsync();
    if (!result) {
      throw new DbException('data not found');
    }

    return result;
  }
}
