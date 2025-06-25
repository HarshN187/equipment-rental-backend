import { Injectable } from '@nestjs/common';
import { AddressRepository } from '../repository/address.repository';

@Injectable()
export class DeleteAddressService {
  constructor(private readonly addressRepo: AddressRepository) {}

  async deleteAddress(addressId: number): Promise<boolean> {
    const result = await this.addressRepo.deleteAsync(addressId);

    return result;
  }
}
