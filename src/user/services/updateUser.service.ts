import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class EditUserService {
  constructor(private readonly userRepo: UserRepository) {}

  async editUser(body: UpdateUserDto): Promise<UserDto> {
    const result = await this.userRepo.updateAsync(body as unknown as UserDto);

    return result;
  }
}
