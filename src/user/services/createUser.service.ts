import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetUserResDto } from '../dto/getUserRes.dto';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepo: UserRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async createUser(body: CreateUserDto): Promise<GetUserResDto> {
    const encryptPassword = await bcrypt.hash(body.password, 10);

    body.password = encryptPassword;

    const reqData = this.mapper.map(body, CreateUserDto, UserDto);

    const result = await this.userRepo.createAsync(reqData);

    const response = this.mapper.map(result, UserDto, GetUserResDto);

    return response;
  }
}
