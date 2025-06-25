import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class DeleteUserService {
  constructor(private readonly userRepo: UserRepository) {}

  async deleteUser(userId: number): Promise<boolean> {
    const result = await this.userRepo.deleteAsync(userId);

    return result;
  }
}
