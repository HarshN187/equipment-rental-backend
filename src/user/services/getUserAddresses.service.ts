import { Injectable } from '@nestjs/common';
import { DbException } from 'src/common/exceptions';
import { AddressRepository } from '../repository/address.repository';
import { AddressDto } from '../dto/address.dto';

@Injectable()
export class GetUserAddressesService {
  constructor(private readonly addressRepo: AddressRepository) {}

  async getUserAddresses(userId: number): Promise<AddressDto[]> {
    const result = await this.addressRepo.allAsync({ $user: { id: userId } });
    if (!result) {
      throw new DbException('data not found');
    }

    return result;
  }
}
