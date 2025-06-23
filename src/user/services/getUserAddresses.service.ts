import { Injectable } from '@nestjs/common';
import { DbException } from 'src/common/exceptions';
import { UserRepository } from 'src/user/repository/user.repository';
import { AddressRepository } from '../repository/address.repository';

@Injectable()
export class GetUserAddressesService {
  constructor(private readonly addressRepo: AddressRepository) {}

  async getUserAddresses(userId: number) {
    const result = await this.addressRepo.allAsync({ $user: userId });
    if (!result) {
      throw new DbException('data not found');
    }

    return result;
  }
}
