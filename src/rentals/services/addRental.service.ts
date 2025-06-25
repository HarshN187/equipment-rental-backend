import { Injectable } from '@nestjs/common';
import { RentalRepository } from '../repository/rentals.repository';
import { RentalDto } from '../dto/rental.dto';
import { DbException } from 'src/common/exceptions';
import { UserRepository } from 'src/user/repository/user.repository';
import { EquipmentRepository } from 'src/equipment/repository/equipment.repository';
import { CreateRentalDto } from '../dto/create-rental.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetRentalResDto } from '../dto/getRentalRes.dto';

@Injectable()
export class AddRentalService {
  constructor(
    private readonly rentalRepo: RentalRepository,
    private readonly userRepo: UserRepository,
    private readonly equipmentRepo: EquipmentRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async createRental(body: CreateRentalDto): Promise<GetRentalResDto> {
    const userData = await this.userRepo.getAsync(body.user);

    if (!userData) {
      throw new DbException('data not found for this id');
    }

    const equipData = await this.equipmentRepo.getAsync(body.equipment);

    if (!equipData) {
      throw new DbException('data not found for this id');
    }

    const data = await this.rentalRepo.createAsync({
      ...body,
      user: userData,
      equipment: equipData,
    } as unknown as RentalDto);

    const response = this.mapper.map(data, RentalDto, GetRentalResDto);

    return response;
  }
}
