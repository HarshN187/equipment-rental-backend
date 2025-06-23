import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepo: UserRepository) {}

  async createUser(body: CreateUserDto) {
    const result = await this.userRepo.createAsync(body as unknown as UserDto);

    return result;
  }
}
