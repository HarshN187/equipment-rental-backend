import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from '../dto/create-address.dto';
import { AddressDto } from '../dto/address.dto';
import { AddressRepository } from '../repository/address.repository';
import { GetUserByIdService } from './getUserById.service';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetAddressResDto } from '../dto/getAddress.dto';

@Injectable()
export class addAddressService {
  constructor(
    private readonly addressRepo: AddressRepository,
    private readonly getUserByIdService: GetUserByIdService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async createAddress(body: CreateAddressDto): Promise<GetAddressResDto> {
    const userData = await this.getUserByIdService.getUserById(body.user);

    const reqData = this.mapper.map(body, CreateAddressDto, AddressDto);

    const result = await this.addressRepo.createAsync({
      ...reqData,
      user: userData,
    } as unknown as AddressDto);

    const response = this.mapper.map(result, AddressDto, GetAddressResDto);

    return response;
  }
}
