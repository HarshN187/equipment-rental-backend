import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from '../dto/create-address.dto';
import { AddressDto } from '../dto/address.dto';
import { AddressRepository } from '../repository/address.repository';
import { GetUserByIdService } from './getUserById.service';

@Injectable()
export class addAddressService {
  constructor(
    private readonly addressRepo: AddressRepository,
    private readonly getUserByIdService: GetUserByIdService,
  ) {}

  async createAddress(body: CreateAddressDto): Promise<AddressDto> {
    const userData = await this.getUserByIdService.getUserById(body.user);

    const result = await this.addressRepo.createAsync({
      ...body,
      user: userData,
    } as unknown as AddressDto);

    return result;
  }
}
