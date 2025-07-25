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
      throw new DbException('user not found for this id');
    }

    const equipData = await this.equipmentRepo.getAsync(body.equipment);

    if (!equipData) {
      throw new DbException('equip not found for this id');
    }

    if (equipData.available_quntity == 0) {
      throw new DbException('equip not Available');
    } else if (equipData.available_quntity - body.quantity == (1 || 0))
      equipData.available = false;
    else if (equipData.available_quntity - body.quantity < 0) {
      throw new DbException('equip not Available in this quantity');
    }

    equipData.available_quntity -= body.quantity;
    const updateEquip = await this.equipmentRepo.updateAsync(equipData);

    const reqData = this.mapper.map(body, CreateRentalDto, RentalDto);

    reqData.status = reqData.status ? reqData.status : 'active';

    const data = await this.rentalRepo.createAsync({
      ...reqData,
      user: userData,
      equipment: updateEquip,
    });

    const response = this.rentalRepo.mapToResponse(data);

    return response;
  }
}
