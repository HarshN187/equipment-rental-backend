import { Injectable } from '@nestjs/common';
import { DbException } from 'src/common/exceptions';
import { AddressRepository } from '../repository/address.repository';
import { AddressDto } from '../dto/address.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetAddressResDto } from '../dto/getAddress.dto';

@Injectable()
export class GetUserAddressesService {
  constructor(private readonly addressRepo: AddressRepository) {}

  async getUserAddresses(userId: number): Promise<GetAddressResDto[]> {
    const result = await this.addressRepo.allAsync({
      user: { user_id: userId },
    });

    if (!result) {
      throw new DbException('data not found');
    }

    const response = this.addressRepo.mapToResponseArray(result);

    return response;
  }
}
