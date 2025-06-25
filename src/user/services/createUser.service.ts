import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepo: UserRepository) {}

  async createUser(body: CreateUserDto) {
    const encryptPassword = await bcrypt.hash(body.password, 10);
    const result = await this.userRepo.createAsync({
      ...body,
      password: encryptPassword,
    } as unknown as UserDto);

    return result;
  }
}
