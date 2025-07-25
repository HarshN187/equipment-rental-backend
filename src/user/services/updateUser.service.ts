import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetUserResDto } from '../dto/getUserRes.dto';

@Injectable()
export class EditUserService {
  constructor(private readonly userRepo: UserRepository) {}

  async editUser(body: UpdateUserDto): Promise<GetUserResDto> {
    body.role = {
      id: 2,
      name: 'user',
    };

    body.user_id = Number(body.user_id);
    const result = await this.userRepo.updateAsync(body as unknown as UserDto);
    console.log(result);
    const response = this.userRepo.mapToResponse(result);

    return response;
  }
}
