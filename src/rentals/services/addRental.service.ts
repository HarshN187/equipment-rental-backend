import { Injectable } from '@nestjs/common';
import { RentalRepository } from '../repository/rentals.repository';
import { RentalDto } from '../dto/rental.dto';
import { DbException } from 'src/common/exceptions';
import { UserRepository } from 'src/user/repository/user.repository';
import { EquipmentRepository } from 'src/equipment/repository/equipment.repository';
import { CreateRentalDto } from '../dto/create-rental.dto';

@Injectable()
export class AddRentalService {
  constructor(
    private readonly rentalRepo: RentalRepository,
    private readonly userRepo: UserRepository,
    private readonly equipmentRepo: EquipmentRepository,
  ) {}

  async createRental(body: CreateRentalDto): Promise<RentalDto> {
    const userData = await this.userRepo.getAsync(body.user);

    const equipData = await this.equipmentRepo.getAsync(body.equipment);

    const data = await this.rentalRepo.createAsync({
      ...body,
      user: userData,
      equipment: equipData,
    } as unknown as RentalDto);

    if (!data) {
      throw new DbException('data not found');
    }

    return data;
  }
}
